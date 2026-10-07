# Basic LLM Chat API

A small Node.js and Express API that accepts a message, loads conversation
history from a local JSON file, sends the context to an LLM, and returns the
generated text.

```text
Client -> POST /chat -> Controller -> Conversation service -> JSON storage
                                                     -> LlmService -> LLM API
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
  "message": "My name is Shreyank."
}
```

Successful response:

```json
{
  "conversationId": "generated-id",
  "response": "Nice to meet you, Shreyank!"
}
```

Send the returned `conversationId` with the next message to continue that
conversation:

```json
{
  "conversationId": "generated-id",
  "message": "What is my name?"
}
```

Conversation messages are stored locally in `data/conversations.json`. Missing
or empty messages return a 400 response, unknown conversation IDs return 404,
and LLM errors return a generic 500 response.
