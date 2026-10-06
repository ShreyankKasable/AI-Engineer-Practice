const express = require("express");

const chatController = require("../controllers/chat.controller");

function createChatRouter() {
  const router = express.Router();

  router.post("/", chatController);

  return router;
}

module.exports = createChatRouter;
