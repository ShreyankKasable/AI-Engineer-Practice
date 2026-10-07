const { randomUUID } = require("crypto");

const conversationStorage = require("../storage/conversation.storage");
const llmService = require("./llm.service");

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
  const answer = await llmService.generateResponse(message, history);

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
