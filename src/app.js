const express = require("express");
const { logRequest } = require("./middlewares/request-logger");
const {
  handleAddExpense,
  handleGetExpenses,
  handleSignUp,
  handleSignIn,
} = require("./handlers/request-handlers");

const addPublicHandlers = (app) => {
  app.use(logRequest);
  app.use(express.json());
  app.post("/sign-up", handleSignUp);
  app.post("/sign-in", handleSignIn);
  app.use(express.static("public"));
};

const addPrivateHandlers = (app) => {
  app.post("/expenses", handleAddExpense);
  app.get("/expenses", handleGetExpenses);
  app.use(express.static("private"));
};

const createApp = (users, expenses, idGenerator, userDataStorage) => {
  const app = express();
  app.users = users;
  app.expenses = expenses;
  app.idGenerator = idGenerator;
  app.userDataStorage = userDataStorage;

  addPublicHandlers(app);
  addPrivateHandlers(app);

  return app;
};

module.exports = { createApp };
