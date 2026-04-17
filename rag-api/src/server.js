import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import { config, validateRuntimeConfig } from "./config.js";
import { embedQuery, retrieveTopChunks } from "./retrieval.js";
import { buildSystemPrompt, buildContextBlock, buildUserPrompt } from "./prompt.js";

validateRuntimeConfig();
const groq = new Groq({ apiKey: config.groqApiKey });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("Message required");

  try {
    const vector = await embedQuery(message);
    const chunks = await retrieveTopChunks(vector);
    const context = buildContextBlock(chunks);

    const stream = await groq.chat.completions.create({
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(message, context) }
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
    res.status(500).json({ error: "Internal error" });
  }
});

app.listen(config.port, () => console.log(`RAG API on http://localhost:${config.port}`));
