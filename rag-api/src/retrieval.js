import OpenAI from "openai";
import { config } from "./config.js";
import { pool, vectorToSql } from "./db.js";

const openai = new OpenAI({ apiKey: config.openAiApiKey });

export async function embedQuery(query) {
  const emb = await openai.embeddings.create({
    model: config.openAiEmbeddingModel,
    input: query,
  });
  return emb.data[0].embedding;
}

export async function retrieveTopChunks(queryVector, limit = 5) {
  const vectorSql = vectorToSql(queryVector);
  const { rows } = await pool.query(
    `SELECT id, content, metadata, (embedding <=> $1::vector) AS distance
     FROM kb_chunks
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [vectorSql, limit],
  );

  return rows.map((r) => ({
    ...r,
    similarity: 1 - Number(r.distance),
  }));
}
