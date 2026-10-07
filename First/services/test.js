const { randomUUID } = require("crypto");

async function sendMessage(message, conversationId){

    const data = await conversationStorage.readConversations();

    const conversation = Object.assign(Object.create(null), data.conversations);

    const id = conversationId || randomUUID();

    const hasConversation = Object.hasOwn(conversation, id);

    if(id && !hasConversation){
        const error = new Error("Conversation not found");
        error.statusCode = 404;
        throw error;
    }

    const existingConversation = hasConversation ? conversation[id] : undefined;
    
    const history = existingConversation?.messages || [];
    const answer = await llmService.generateResponse(message, history);

    conversation[id] = {
        messages: [
            ...history,
            { role: "user", content: message },
            { role: "assistant", content: answer },
        ],
    };

    data.conversations = conversation;
    await conversationStorage.writeConversations(data);

    return { conversationId: id, response: answer };
}

module.exports = { sendMessage };    