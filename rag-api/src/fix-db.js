import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "./.env" });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    console.log("Dropping old 1536-dimensional table...");
    await pool.query("DROP TABLE IF EXISTS kb_chunks CASCADE;");
    
    console.log("Creating new 384-dimensional table for Xenova MiniLM...");
    await pool.query(`
      CREATE TABLE kb_chunks (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        metadata JSONB NOT NULL,
        embedding vector(384) NOT NULL
      );
    `);
    
    console.log("Recreating metadata index...");
    await pool.query("CREATE INDEX kb_chunks_metadata_idx ON kb_chunks USING GIN (metadata);");

    console.log("✅ Database successfully modified to vector(384) for 100% Free Embeddings!");
  } catch (error) {
    console.error("❌ SQL Error:", error.message);
  } finally {
    pool.end();
  }
}

run();
