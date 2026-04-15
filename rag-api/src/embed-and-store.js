import fs from "fs/promises";
import OpenAI from "openai";
import { config, validateRuntimeConfig } from "./config.js";
import { pool, vectorToSql } from "./db.js";

async function main() {
  validateRuntimeConfig();

  const inputPath = process.argv[2] || "./data/chunks.json";
  const raw = await fs.readFile(inputPath, "utf-8");
  const chunks = JSON.parse(raw);

  if (!Array.isArray(chunks) || chunks.length === 0) {
    throw new Error("No chunks found. Run ingest:docx first.");
  }

  const openai = new OpenAI({ apiKey: config.openAiApiKey });

  await pool.query("DELETE FROM kb_chunks");

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const emb = await openai.embeddings.create({
      model: config.openAiEmbeddingModel,
      input: chunk.content,
    });

    const embedding = emb.data[0].embedding;
    const embeddingSql = vectorToSql(embedding);

    await pool.query(
      `INSERT INTO kb_chunks (content, metadata, embedding) VALUES ($1, $2::jsonb, $3::vector)`,
      [chunk.content, JSON.stringify({ type: chunk.type, section: chunk.section, keywords: chunk.keywords || [] }), embeddingSql],
    );

    console.log(`Stored chunk ${i + 1}/${chunks.length}`);
  }

  await pool.end();
  console.log("Embedding + storage complete.");
}

main().catch(async (err) => {
  console.error(err.message);
  await pool.end();
  process.exit(1);
});
