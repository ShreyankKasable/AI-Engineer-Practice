# Basic LLM Chat API

A small Node.js and Express API that accepts a message, sends it to an LLM,
and returns only the generated text.

```text
Client -> POST /chat -> Controller -> LlmService -> LLM API
```

## Setup

Requires Node.js 20 or newer.

```powershell
npm install
Copy-Item .env.example .env
```

Set `LLM_API_KEY` and `LLM_MODEL` in `.env`. `PORT` defaults to `3000`.

## Start

```powershell
npm start
```

## Request

Send JSON to `POST /chat`:

```json
{
  "message": "What is machine learning?"
}
```

Successful response:

```json
{
  "response": "Machine learning is..."
}
```

Missing or empty messages return a 400 response. LLM errors return a generic
500 response without exposing internal or provider details.
