const OpenAI = require("openai");

const SYSTEM_PROMPT = [
    "You are a helpful AI interview assistant.",
    "Explain technical concepts clearly and in simple language.",
    "Use practical examples when they help understanding.",
    "If you are uncertain, say so instead of inventing information.",
].join(" ");

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
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
        ],
    });

    const answer = result.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
        throw new Error("The LLM returned an empty response.");
    }

    return answer.trim();
}

module.exports = { generateResponse };
