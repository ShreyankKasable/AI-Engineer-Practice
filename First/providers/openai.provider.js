const OpenAI = require("openai");

function createOpenAIProvider({ apiKey }) {
  if (!apiKey) {
    throw new Error("LLM_API_KEY must be set in the environment.");
  }

  return new OpenAI({ apiKey });
}

module.exports = createOpenAIProvider;
