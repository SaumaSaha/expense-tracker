const express = require("express");
const { logRequest } = require("./middlewares/request-logger");

const createApp = () => {
  const app = express();

  app.use(logRequest);
  app.use(express.static("public"));
  return app;
};

module.exports = { createApp };
