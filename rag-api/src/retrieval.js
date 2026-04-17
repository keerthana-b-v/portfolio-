import { pipeline, env } from "@xenova/transformers";
import { config } from "./config.js";
import { pool, vectorToSql } from "./db.js";

env.cacheDir = "/tmp/";

let embedderInstance = null;

export async function embedQuery(query) {
  if (!embedderInstance) {
    embedderInstance = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  const result = await embedderInstance(query, { pooling: "mean", normalize: true });
  return Array.from(result.data);
}

export async function retrieveTopChunks(queryVector, limit = 5) {
  const vectorSql = vectorToSql(queryVector);
  const { rows } = await pool.query(
    `SELECT id, content, metadata FROM match_kb_chunks($1::vector, $2, $3)`,
    [vectorSql, config.similarityThreshold, limit]
  );
  return rows;
}
