import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || "",
  groqApiKey: process.env.GROQ_API_KEY || "",
  similarityThreshold: Number(process.env.RAG_SIMILARITY_THRESHOLD || 0.15)
};

export function validateRuntimeConfig() {
  const missing = [];
  if (!config.databaseUrl) missing.push("DATABASE_URL");
  if (!config.groqApiKey) missing.push("GROQ_API_KEY");
  if (missing.length) throw new Error(`Missing: ${missing.join(", ")}`);
}
