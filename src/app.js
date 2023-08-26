const express = require("express");
const { logRequest } = require("./middlewares/request-logger");

const handleHomePage = (_, res) => res.redirect(303, "/index.html");

const createApp = () => {
  const app = express();

  app.use(logRequest);
  app.get("/", handleHomePage);
  app.use(express.static("public"));
  return app;
};

module.exports = { createApp };
