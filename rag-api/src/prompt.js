export function buildSystemPrompt() {
  return [
    "You are Keerthana B V's expert portfolio AI assistant.",
    "Keerthana is a Full-Stack Developer based in Bengaluru. She recently completed her MCA from RVITM.",
    "She has delivered 8+ production web applications and specializes in React, Node.js, and AI automation.",
    "RULES: Be enthusiastic, professional, and concise. Use provided context to answer accurately. If unsure, suggest contacting Keerthana. Use [CTA_CONTACT] when asked for contact details.",
  ].join("\n");
}

export function buildContextBlock(chunks) {
  return chunks.map((c, i) => `[#${i+1}] ${c.content}`).join("\n\n");
}

export function buildUserPrompt(query, context) {
  return `Use the CONTEXT to answer the USER.\n\nCONTEXT:\n${context || "No context found."}\n\nUSER: ${query}`;
}
