const OpenAI = require("openai");

let client;

function getClient() {
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL;

  if (!apiKey) {
    throw new Error("LLM_API_KEY must be set in the environment.");
  }
  if (!model) {
    throw new Error("LLM_MODEL must be set in the environment.");
  }

  if (!client) {
    client = new OpenAI({ apiKey });
  }

  return { client, model };
}

async function generateResponse(message) {
  const { client, model } = getClient();
  const result = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: message }],
  });

  const answer = result.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || !answer.trim()) {
    throw new Error("The LLM returned an empty response.");
  }

  return answer.trim();
}

module.exports = { generateResponse };
