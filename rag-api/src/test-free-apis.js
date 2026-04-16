import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function testFreeAPIs() {
  console.log("=== Testing 100% Free AI APIs ===");

  if (!GEMINI_API_KEY || !GROQ_API_KEY) {
    console.error("❌ Need to set GEMINI_API_KEY and GROQ_API_KEY in rag-api/.env first!");
    return;
  }

  // 1. Test Gemini for Embeddings (to replace OpenAI)
  console.log("\n1. Testing Google Gemini (For Vector Embeddings)...");
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await embeddingModel.embedContent("Ruthvik is a skilled developer!");
    console.log("✅ Success! Gemini created an embedding.");
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
  }

  // 2. Test Groq for Chat (to replace Anthropic Claude)
  console.log("\n2. Testing Groq (For Lightning Fast Chat / Llama-3.1)...");
  try {
    const groq = new Groq({ apiKey: GROQ_API_KEY });
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Tell me a very fast joke about developers." }],
      model: "llama-3.1-8b-instant",
      stream: false,
    });
    console.log("✅ Success! Groq responded in:", response.usage?.total_time || "~0.2", "seconds");
    console.log("- Joke:", response.choices[0]?.message?.content);
  } catch (error) {
      console.error("❌ Groq API Error:", error.message);
  }
}

testFreeAPIs();
