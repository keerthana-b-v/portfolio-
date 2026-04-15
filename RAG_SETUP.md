# RAG Chatbot Build Steps (ruthvikrr.in)

Recommended stack: **Node.js + pgvector + Claude API + React-style widget**

## Step 1 - Prep the knowledge base

Convert `.docx` to plain text chunks.

- Each Q&A pair = 1 chunk
- Each Section 2 subsection = 1-2 chunks
- Metadata per chunk:

```json
{
  "type": "qa" | "fact",
  "section": "experience" | "project" | "skills" | "identity" | "contact",
  "keywords": ["..."]
}
```

Implemented in: `rag-api/src/ingest-docx.js`

Run:

```bash
cd rag-api
npm run ingest:docx
```

## Step 2 - Set up vector DB (Hostinger Postgres)

Run:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS kb_chunks (
  id SERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536)
);
```

Already included at: `rag-api/sql/schema.sql`

## Step 3 - Generate embeddings

Uses OpenAI `text-embedding-3-small` (1536 dims).

Run:

```bash
npm run embed:store
```

Implemented in: `rag-api/src/embed-and-store.js`

## Step 4 - Build `/chat` endpoint

Flow implemented in `rag-api/src/server.js`:

1. Embed user query with same embedding model
2. Similarity search: top 5 via `ORDER BY embedding <=> $query_vector LIMIT 5`
3. If best similarity `< 0.75`, return fallback
4. Inject retrieved chunks into Claude context prompt
5. Stream response back via SSE

## Step 5 - Haiku/Sonnet routing

Implemented in `rag-api/src/prompt.js`:

- Short factual questions (under 10 words) -> `claude-haiku-4-5-20251001`
- Multi-part/behavioral/complex -> `claude-sonnet-4-6`

## Step 6 - Build chat widget

Implemented in existing portfolio frontend:

- Floating bubble bottom-right
- Starter chips:
  - Tell me about Ruthvik
  - What AI stack?
  - What's he building now?
  - How to contact
- SSE stream rendering in UI
- Contact CTA appears when `[CTA_CONTACT]` token is present

Files:

- `index.html` (widget markup)
- `styles.css` (widget styling)
- `script.js` (widget logic + streaming)

## Step 7 - Deploy on Hostinger VPS

Run API on port 4000 and reverse proxy:

```nginx
location /api/chat {
  proxy_pass http://127.0.0.1:4000/chat;
  proxy_http_version 1.1;
  proxy_set_header Connection '';
  proxy_buffering off;
  chunked_transfer_encoding on;
}

location /api/health {
  proxy_pass http://127.0.0.1:4000/health;
}
```

PM2:

```bash
cd /var/www/ruthvikrr.in/rag-api
npm install
cp .env.example .env
pm2 start ecosystem.config.cjs
pm2 save
```

---

## Quick Run Checklist

1. Fill `rag-api/.env`
2. Execute `rag-api/sql/schema.sql` in Hostinger Postgres
3. `npm run ingest:docx`
4. `npm run embed:store`
5. `npm run start`
6. Configure Nginx `/api/chat` and `/api/health`
7. Verify widget in portfolio frontend
