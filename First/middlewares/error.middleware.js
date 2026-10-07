function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Invalid JSON request body" });
  }

  if (error.statusCode >= 400 && error.statusCode < 500) {
    return response.status(error.statusCode).json({
      error: error.statusCode === 404 ? "Conversation not found" : "Request failed",
    });
  }

  return response.status(500).json({ error: "Failed to generate response" });
}

module.exports = errorHandler;
