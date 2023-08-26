const express = require("express");

const handleHomePage = (_, res) => res.send("Home Page");

const createApp = () => {
  const app = express();

  app.get("/", handleHomePage);
  return app;
};

module.exports = { createApp };
