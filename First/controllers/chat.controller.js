const llmService = require("../services/llm.service");

async function chat(request, response) {

    const message = request.body?.message;

    if (typeof message !== "string" || !message.trim()) {
        return response.status(400).json({ 
            error: "A message is required" 
        });
    }

    const answer = await llmService.generateResponse(message.trim());
    return response.status(200).json({ response: answer });
}

module.exports = chat;
