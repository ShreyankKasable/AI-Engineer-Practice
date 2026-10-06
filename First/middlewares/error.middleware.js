function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  console.error(
    `Method: ${request.method} URL: ${request.originalUrl} Error: ${error.message}`,
  );

  if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Invalid JSON request body" });
  }

  if (error.statusCode === 400) {
    return response.status(400).json({ error: error.message });
  }

  return response.status(500).json({ error: "Failed to generate response" });
}

module.exports = errorHandler;
