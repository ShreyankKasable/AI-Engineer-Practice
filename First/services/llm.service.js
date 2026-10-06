const createOpenAIProvider = require("../providers/openai.provider");

class LlmService {
  constructor() {
    this.model = process.env.LLM_MODEL;
    if (!this.model) {
      throw new Error("LLM_MODEL must be set in the environment.");
    }

    this.providers = {
      openai: createOpenAIProvider({ apiKey: process.env.LLM_API_KEY }),
    };
  }

  async generateResponse(providerName, message) {
    if (!Object.hasOwn(this.providers, providerName)) {
      const error = new Error(`Unsupported provider: ${providerName}`);
      error.statusCode = 400;
      throw error;
    }

    if (providerName === "openai") {
      return this.generateOpenAIResponse(message);
    }
  }

  async generateOpenAIResponse(message) {
    const result = await this.providers.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: message }],
    });

    const response = result.choices?.[0]?.message?.content;
    if (typeof response !== "string" || !response.trim()) {
      throw new Error("The LLM returned an empty response.");
    }

    return response.trim();
  }
}

module.exports = new LlmService();
