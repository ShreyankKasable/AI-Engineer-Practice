const fs = require("fs/promises");
const path = require("path");

const conversationsFile = path.join(
  __dirname,
  "../data/conversations.json",
);

async function readConversations() {
  let contents;
  try {
    contents = await fs.readFile(conversationsFile, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    return { conversations: {} };
  }

  const data = JSON.parse(contents);
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    !data.conversations ||
    typeof data.conversations !== "object" ||
    Array.isArray(data.conversations)
  ) {
    throw new Error("Conversation storage has an invalid format.");
  }

  return data;
}

async function writeConversations(data) {
  await fs.mkdir(path.dirname(conversationsFile), { recursive: true });
  await fs.writeFile(
    conversationsFile,
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

module.exports = { readConversations, writeConversations };
