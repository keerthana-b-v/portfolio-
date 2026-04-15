import express from "express";
import cors from "cors";
import { config, validateRuntimeConfig } from "./config.js";
import { embedQuery, retrieveTopChunks } from "./retrieval.js";
import { buildContextBlock, buildSystemPrompt, buildUserPrompt, routeModel } from "./prompt.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function streamClaude({ model, system, userContent, apiKey, onText }) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 800,
      stream: true,
      system,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!response.ok || !response.body) {
    const text = await response.text();
    throw new Error(`Anthropic API error: ${response.status} ${text}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      const line = event.split("\n").find((l) => l.startsWith("data:"));
      if (!line) continue;

      const dataRaw = line.slice(5).trim();
      if (dataRaw === "[DONE]") continue;

      try {
        const data = JSON.parse(dataRaw);
        if (data.type === "content_block_delta" && data.delta?.type === "text_delta") {
          onText(data.delta.text || "");
        }
      } catch {
        // Ignore malformed event chunks.
      }
    }
  }
}

app.get("/health", (_, res) => {
  res.json({ ok: true, service: "ruthvik-rag-api" });
});

app.post("/chat", async (req, res) => {
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

    if (bestSimilarity < config.similarityThreshold) {
      writeSse(res, {
        type: "chunk",
        text: "I don't have enough verified context for that yet. Please reach out directly at ruthvikarh@gmail.com for accurate details. [CTA_CONTACT]",
      });
      writeSse(res, { type: "done" });
      return res.end();
    }

    const contextBlock = buildContextBlock(topChunks);
    const system = buildSystemPrompt();
    const prompt = buildUserPrompt(userMessage, contextBlock);
    const model = routeModel(userMessage);

    await streamClaude({
      model,
      system,
      userContent: prompt,
      apiKey: config.anthropicApiKey,
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
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`RAG API running on http://localhost:${config.port}`);
  });
}

start();
