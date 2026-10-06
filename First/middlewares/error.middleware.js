function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const invalidJson = error.type === "entity.parse.failed";

  return response.status(invalidJson ? 400 : 500).json({
    error: invalidJson
      ? "Invalid JSON request body"
      : "Failed to generate response",
  });
}

module.exports = errorHandler;
