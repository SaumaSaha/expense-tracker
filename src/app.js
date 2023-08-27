const express = require("express");
const { logRequest } = require("./middlewares/request-logger");
const {
  handleAddExpense,
  handleGetExpenses,
  handleSignUp,
} = require("./handlers/request-handlers");

const addMiddleWares = (app) => {
  app.use(logRequest);
  app.use(express.json());
  app.use(express.static("public"));
};

const createApp = (expenses, idGenerator, userDataManager) => {
  const app = express();
  app.expenses = expenses;
  app.idGenerator = idGenerator;
  app.userDataManager = userDataManager;

  addMiddleWares(app);
  app.post("/expenses", handleAddExpense);
  app.get("/expenses", handleGetExpenses);
  app.post("/sign-up", handleSignUp);

  return app;
};

module.exports = { createApp };
