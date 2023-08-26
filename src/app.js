const express = require("express");
const { logRequest } = require("./middlewares/request-logger");
const { handleAddExpense } = require("./handlers/request-handlers");

const createApp = (expenses, idGenerator) => {
  const app = express();
  app.expenses = expenses;
  app.idGenerator = idGenerator;

  app.use(logRequest);
  app.use(express.json());
  app.use(express.static("public"));
  app.post("/expenses", handleAddExpense);
  return app;
};

module.exports = { createApp };
