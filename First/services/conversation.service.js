const { randomUUID } = require("crypto");

const conversationStorage = require("../storage/conversation.storage");
const llmService = require("./llm.service");

function getHistoryLimit() {
  const value = process.env.LLM_HISTORY_LIMIT ?? "6";
  const limit = Number(value);

  if (!value.trim() || !Number.isInteger(limit) || limit < 0) {
    throw new Error("LLM_HISTORY_LIMIT must be a non-negative integer.");
  }

  return limit;
}

async function sendMessage(message, conversationId) {
    
    const data = await conversationStorage.readConversations();
    const conversations = Object.assign(Object.create(null), data.conversations);
    const id = conversationId || randomUUID();
    const hasConversation = Object.hasOwn(conversations, id);

    if (conversationId && !hasConversation) {
        const error = new Error("Conversation not found");
        error.statusCode = 404;
        throw error;
    }

    const conversation = hasConversation ? conversations[id] : undefined;
    if (hasConversation && !Array.isArray(conversation?.messages)) {
        throw new Error("Conversation history is invalid.");
    }

    const history = conversation?.messages || [];
    const historyLimit = getHistoryLimit();
    const recentHistory =
      historyLimit === 0 ? [] : history.slice(-historyLimit);
    const answer = await llmService.generateResponse(message, recentHistory);

    conversations[id] = {
        messages: [
        ...history,
        { role: "user", content: message },
        { role: "assistant", content: answer },
        ],
    };
    data.conversations = conversations;
    await conversationStorage.writeConversations(data);

    return { conversationId: id, response: answer };
}

module.exports = { sendMessage };
