const express = require("express");
const { handleAddExpense, handleGetExpenses } = require("./handlers/expense-handlers");

const {
  handleSignUp,
  handleSignIn,
  handleValidateUsername,
  handleSignOut,
} = require("./handlers/auth-handlers");

const { logRequest } = require("./middlewares/request-logger");
const { parseCookies } = require("./middlewares/cookie-parser");
const { handleAuth } = require("./middlewares/auth-handler");

const addPublicHandlers = (app) => {
  app.use(logRequest);
  app.use(express.json());
  app.use(parseCookies);
  app.get("/validate-username", handleValidateUsername);
  app.post("/sign-up", handleSignUp);
  app.post("/sign-in", handleSignIn);
  app.use(express.static("public"));
};

const addPrivateHandlers = (app) => {
  app.use(handleAuth);
  app.get("/sign-out", handleSignOut);
  app.post("/expenses", handleAddExpense);
  app.get("/expenses", handleGetExpenses);
  app.use(express.static("private"));
};

const createApp = (users, expenses, idGenerator, dataStorage) => {
  const app = express();
  app.users = users;
  app.expenses = expenses;
  app.idGenerator = idGenerator;
  app.dataStorage = dataStorage;

  addPublicHandlers(app);
  addPrivateHandlers(app);

  return app;
};

module.exports = { createApp };
