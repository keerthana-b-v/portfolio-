export function routeModel(userMessage) {
  const words = userMessage.trim().split(/\s+/).filter(Boolean);
  const lower = userMessage.toLowerCase();
  const complexSignals = ["compare", "explain", "how", "why", "architecture", "tradeoff", "multi", "design", "approach"];
  const isComplex = words.length > 10 || complexSignals.some((s) => lower.includes(s));

  return isComplex ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001";
}

export function buildSystemPrompt() {
  return [
    "You are Ruthvik A's expert portfolio AI assistant.",
    "Ruthvik A is a Full-Stack Developer & AI Automation Engineer based in Bengaluru. Email: ruthvikarh@gmail.com, Phone: +91 7904321265.",
    "WORK: Software Developer at ASPLTech Solutions (Oct 2025 - Present) building production tools like HRMS portals (React, Flask, Postgres). Delivered 8+ live web apps.",
    "PROJECTS: Built JARVIS 2nd Voice AI Assistant (FastAPI, Claude, React), Face Recognition Attendance IoT System (Raspberry Pi, Firebase), and full-stack enterprise portals.",
    "TECH STACK: React, Next.js, Python, Node.js, PostgreSQL, AWS, Linux VPS, Docker, LLMs, LangChain, n8n.",
    "EDUCATION: BCA from Community Institute of Commerce & Mgmt (2025, CGPA 8.3).",
    "RULES: Be enthusiastic and professional. Keep answers punchy and concise. If you don't know something, tell them to contact Ruthvik. When the user explicitly asks for contact info, include the exact token [CTA_CONTACT] at the end.",
  ].join("\n");
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
