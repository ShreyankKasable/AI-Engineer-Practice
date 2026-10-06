const express = require("express");
require("dotenv").config();

const errorHandler = require("./middlewares/error.middleware");
const chatRouter = require("./routes/chat.routes");
const app = express();

app.use(express.json());
app.use("/chat", chatRouter);
app.use(errorHandler);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Chat API listening on port ${port}.`);
  });
}

module.exports = app;
