# Basic LLM Chat API

A small Node.js and Express API that sends a user's message to an LLM and
returns only the generated text.

The Express app and server startup are both in `app.js`, following the style of
the Express-Practice Question-3 project. The route, controller, and LLM service
remain separate. The class-based LLM service creates and selects a provider
based on the `provider` field in each request. The controller imports the
shared service instance directly, so the app and route do not pass it around.
Provider modules create SDK clients; the service contains provider-specific
request and response code.

```text
Route → Controller → LLM service → Provider adapter → LLM API
```

## Setup

Requires Node.js 20 or newer.

```powershell
npm install
Copy-Item .env.example .env
```

Set both `LLM_API_KEY` and `LLM_MODEL` in `.env`. The app throws a
configuration error if either value is missing. `PORT` defaults to `3000`.

## Start the API

```powershell
npm start
```

## Request

Send JSON to `POST /chat`:

```json
{
  "provider": "openai",
  "message": "Explain what an API is in simple terms."
}
```

Successful response:

```json
{
  "response": "An API is a way for software systems to communicate."
}
```

Missing messages and unsupported providers receive `400 Bad Request`. LLM
failures return a generic `500` response without exposing provider details.
