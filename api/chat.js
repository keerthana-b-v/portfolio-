import { pipeline, env } from "@xenova/transformers";
import Groq from "groq-sdk";
import pg from "pg";

const { Pool } = pg;

// Vercel Cache Fix
env.cacheDir = "/tmp/";

let embedderInstance = null;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { message } = req.body;
  if (!message) return res.status(400).send('Message missing');

  try {
    // 1. Local Embedding
    if (!embedderInstance) {
      embedderInstance = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }
    const output = await embedderInstance(message, { pooling: "mean", normalize: true });
    const vector = Array.from(output.data);

    // 2. Retrieval from Supabase
    const { rows } = await pool.query(
      `SELECT content FROM match_kb_chunks($1::vector, 0.15, 5)`,
      [`[${vector.join(",")}]`]
    );
    const context = rows.map((r, i) => `[#${i+1}] ${r.content}`).join("\n\n");

    // 3. Groq Completion
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const systemPrompt = `You are Keerthana B V's expert portfolio AI assistant. 
    Keerthana is a Full-Stack Developer (MCA) specializing in React, Node, and AI.
    Answer accurately using the context. If unsure, tell the user to contact Keerthana at her email.
    Use [CTA_CONTACT] for contact info.`;

    const stream = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Context:\n${context}\n\nUser: ${message}` }
      ],
      model: "llama-3.1-8b-instant",
      stream: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
