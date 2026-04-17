# RAG Chatbot Enhancement Roadmap

This document outlines the planned upgrades for the portfolio RAG Chatbot. All enhancements are designed to use **100% free, open-source infrastructure** (Groq API, local Hugging Face models, and Supabase free tier).

## Phase 1: Persona Re-engineering (Prompt Upgrade)
*Status: Ready to Implement*
**Goal:** Make the bot sound like a highly persuasive, intelligent proxy for Ruthvik, rather than a robot reading a PDF.
- [ ] **Erase the "3rd Party" Voice:** Forbid phrases like "According to his resume" or "Based on his portfolio." The AI must speak confidently with inherent knowledge.
- [ ] **The "No I-Don't-Know" Rule (Pivot Strategy):** If queried about unknown data, the AI will never fail out. It will intelligently pivot the conversation back to core strengths (e.g., "While Ruthvik focuses heavily on X, he has deep expertise in Y...").
- [ ] **Subtextual Alignment:** Instruct the AI to implicitly connect everyday queries to Ruthvik's overarching passions (Cloud, IoT, Full-Stack Architecture, AI automation).

## Phase 2: Conversational Memory
*Status: Pending*
**Goal:** Allow users and recruiters to ask continuous follow-up questions naturally.
- [ ] **Frontend Updates:** Update the widget state to hold a rolling window of the last 4-6 messages.
- [ ] **Backend Updates:** Modify `server.js` to ingest that array and pass the conversation history sequentially into Groq's `messages` array, preventing goldfish memory.

## Phase 3: Embedding & Retrieval Upgrades
*Status: Pending*
**Goal:** Guarantee perfect accuracy when answering highly specific technical questions.
- [ ] **Model Swap:** Upgrade `retrieval.js` from `all-MiniLM-L6-v2` to a higher-scoring local HuggingFace model (e.g., `Xenova/bge-small-en-v1.5`) for smarter vector matching.
- [ ] **Hybrid Search:** Utilize Supabase's native PostgreSQL Full-Text Search alongside `pgvector`. This blends mathematical conceptual matching with exact-keyword matching.
- [ ] **Smart Chunking:** Add character overlap to the data ingestion script so sentences are never cut in half.

## Phase 4: Agentic Capabilities (Function Calling)
*Status: Future Expansion*
**Goal:** Give the AI the power to take physical actions on Ruthvik's behalf.
- [ ] **Define Javascript Tools:** Write native JS functions acting as tools (e.g., `sendContactEmail`, `provideCalendarLink`).
- [ ] **Groq Integration:** Map these tools to `llama-3.1-8b-instant`. Instruct the AI to trigger a tool execution when a recruiter expresses intent to interview or contact.

## Phase 5: Automated GitHub Knowledge Ingestion
*Status: Pending*
**Goal:** Give the RAG AI dynamic, live knowledge of Ruthvik's coding skills directly from his GitHub API.
- [ ] **GitHub API Integration:** Write a Node script that authenticates with GitHub and pulls down repository names, languages used, and ReadMe files.
- [ ] **Continuous Vector Sync:** Embed this actual project metadata into the Supabase Vector Database.
- [ ] **Dynamic Answering:** Teach the AI to quantify skills based on this live data.

## Phase 6: The Autonomous Portfolio (Multi-Agent System)
*Status: Visionary Architecture*
**Goal:** Transition from a static website to a self-updating, autonomous digital entity managed by specialized AI Agents.
- [ ] **The "GitHub Agent":** Listens for new commits/repos. Automatically updates the RAG memory *and* writes new code to your portfolio UI to display the new project, committing pushing it to GitHub automatically.
- [ ] **The "Content Agent":** Monitors your LinkedIn and Medium/DevTo blogs via webhooks. Automatically parses your posts, injects them into the RAG's database, and publishes them into an "Updates" section on the frontend UI.
- [ ] **Orchestration:** Bind these agents together using an automation pipeline (like n8n) so Ruthvik never has to manually update his portfolio again.
