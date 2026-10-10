const conversationService = require("../services/conversation.service");

async function chat(request, response) {
    const message = request.body?.message;

    if (typeof message !== "string" || !message.trim()) {
        return response.status(400).json({ error: "A message is required" });
    }

    const conversationId = request.body?.conversationId;
    if ( conversationId !== undefined && (typeof conversationId !== "string" || !conversationId.trim())) {
        return response.status(400).json({ error: "A valid conversationId is required" });
    }

    const result = await conversationService.sendMessage(
        message.trim(),
        conversationId?.trim(),
    );

    return response.status(200).json(result);
}

module.exports = chat;
