import express from "express";
import cors from "cors";
import { config, validateRuntimeConfig } from "./config.js";
import { embedQuery, retrieveTopChunks } from "./retrieval.js";
import { buildContextBlock, buildSystemPrompt, buildUserPrompt, routeModel } from "./prompt.js";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function streamGroq({ system, userContent, apiKey, onText }) {
  const groq = new Groq({ apiKey });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: system },
      { role: "user", content: userContent }
    ],
    model: "llama-3.1-8b-instant", // Using Groq's lightning fast model natively!
    temperature: 0.3,
    max_tokens: 1024,
    stream: true,
  });

  for await (const chunk of chatCompletion) {
    onText(chunk.choices[0]?.delta?.content || "");
  }
}

app.get(["/health", "/api/health"], (_, res) => {
  res.json({ ok: true, service: "ruthvik-rag-api" });
});

app.post(["/chat", "/api/chat"], async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const userMessage = String(req.body?.message || "").trim();
  if (!userMessage) {
    writeSse(res, { type: "error", message: "Message is required." });
    return res.end();
  }

  try {
    const queryVector = await embedQuery(userMessage);
    const topChunks = await retrieveTopChunks(queryVector, 5);
    const bestSimilarity = topChunks[0]?.similarity ?? 0;

    writeSse(res, {
      type: "meta",
      similarity: bestSimilarity,
      routedModel: routeModel(userMessage),
      retrieved: topChunks.length,
    });

    // Optional soft logging for similarity
    // if (bestSimilarity < config.similarityThreshold) console.log("Low similarity match, relying on system prompt baseline.");

    const contextBlock = buildContextBlock(topChunks);
    const system = buildSystemPrompt();
    const prompt = buildUserPrompt(userMessage, contextBlock);
    const model = routeModel(userMessage);

    await streamGroq({
      system,
      userContent: prompt,
      apiKey: config.groqApiKey,
      onText: (text) => writeSse(res, { type: "chunk", text }),
    });

    writeSse(res, { type: "done" });
    res.end();
  } catch (err) {
    writeSse(res, { type: "error", message: err.message || "Unknown server error" });
    res.end();
  }
});

async function start() {
  try {
    validateRuntimeConfig();
  } catch (e) {
    console.error(e.message);
    // Don't exit process on Vercel, just log
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }

  // Only listen on a port if run locally. Vercel automatically maps exported apps.
  if (process.env.NODE_ENV !== 'production') {
    app.listen(config.port, () => {
      console.log(`RAG API running on http://localhost:${config.port}`);
    });
  }
}

start();

// EXPORT the app so Vercel can treat it as a Serverless Function!
export default app;
