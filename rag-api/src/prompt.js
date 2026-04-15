export function routeModel(userMessage) {
  const words = userMessage.trim().split(/\s+/).filter(Boolean);
  const lower = userMessage.toLowerCase();
  const complexSignals = ["compare", "explain", "how", "why", "architecture", "tradeoff", "multi", "design", "approach"];
  const isComplex = words.length > 10 || complexSignals.some((s) => lower.includes(s));

  return isComplex ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001";
}

export function buildSystemPrompt() {
  return [
    "You are Ruthvik's portfolio assistant.",
    "Answer only from the provided context when possible.",
    "If context is insufficient, state that briefly and suggest contacting Ruthvik.",
    "Keep answers concise, practical, and recruiter-friendly.",
    "When the user asks for contact or next step, include token [CTA_CONTACT] at the end.",
  ].join(" ");
}

export function buildContextBlock(chunks) {
  return chunks
    .map((c, idx) => {
      const meta = c.metadata || {};
      return `[#${idx + 1}] section=${meta.section || "unknown"} type=${meta.type || "fact"}\n${c.content}`;
    })
    .join("\n\n");
}

export function buildUserPrompt(userMessage, contextBlock) {
  return [
    "Use the CONTEXT to answer the USER query.",
    "If needed, say what is unknown instead of hallucinating.",
    "",
    "CONTEXT:",
    contextBlock || "No relevant context retrieved.",
    "",
    `USER: ${userMessage}`,
  ].join("\n");
}
