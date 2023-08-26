const express = require("express");
const { logRequest } = require("./middlewares/request-logger");

const handleHomePage = (_, res) => res.send("Home Page");

const createApp = () => {
  const app = express();

  app.use(logRequest);
  app.get("/", handleHomePage);
  return app;
};

module.exports = { createApp };
