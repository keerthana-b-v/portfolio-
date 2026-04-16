import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || "",
  openAiApiKey: process.env.OPENAI_API_KEY || "",
  openAiEmbeddingModel: process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small",
  groqApiKey: process.env.GROQ_API_KEY || "",
  similarityThreshold: Number(process.env.RAG_SIMILARITY_THRESHOLD || 0.15),
  githubToken: process.env.GITHUB_TOKEN || "",
};

export function validateRuntimeConfig() {
  const missing = [];
  if (!config.databaseUrl) missing.push("DATABASE_URL");
  if (!config.openAiApiKey) missing.push("OPENAI_API_KEY");
  if (!config.groqApiKey) missing.push("GROQ_API_KEY");

  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}
