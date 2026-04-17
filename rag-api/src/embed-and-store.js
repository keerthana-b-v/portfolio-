import fs from "fs";
import path from "path";
import { pipeline } from "@xenova/transformers";
import { pool, vectorToSql } from "./db.js";
import { validateRuntimeConfig } from "./config.js";

async function run() {
  validateRuntimeConfig();
  const chunksPath = path.join(process.cwd(), "data", "kb-chunks.json");
  const chunks = JSON.parse(fs.readFileSync(chunksPath, "utf-8"));
  
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  console.log(`Starting embedding for ${chunks.length} chunks...`);
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const output = await embedder(chunk.content, { pooling: "mean", normalize: true });
    const embedding = Array.from(output.data);
    
    await pool.query(
      `INSERT INTO kb_chunks (content, metadata, embedding) VALUES ($1, $2, $3::vector)`,
      [chunk.content, JSON.stringify(chunk.metadata), vectorToSql(embedding)]
    );
    
    if ((i + 1) % 5 === 0) console.log(`Stored ${i + 1}/${chunks.length} chunks`);
  }
  
  console.log("Done storing all chunks!");
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
