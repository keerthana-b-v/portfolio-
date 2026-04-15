# Ruthvik RAG API

## 1) Install

```bash
cd rag-api
npm install
cp .env.example .env
```

Set `.env` values for `DATABASE_URL`, `OPENAI_API_KEY`, and `ANTHROPIC_API_KEY`.

## 2) Set up pgvector table

Run SQL from `sql/schema.sql` on your Hostinger Postgres.

## 3) Build knowledge chunks from DOCX

```bash
npm run ingest:docx
```

This creates `data/chunks.json` with metadata:

- `type`: `qa` or `fact`
- `section`: `experience` | `project` | `skills` | `identity` | `contact`
- `keywords`: extracted keyword hints

## 4) Generate embeddings + store in DB

```bash
npm run embed:store
```

Uses `text-embedding-3-small` (1536 dimensions).

## 5) Run API

```bash
npm run dev
```

Endpoints:

- `GET /health`
- `POST /chat` (SSE stream)

## 6) Nginx reverse proxy (Hostinger VPS)

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

## 7) PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```
