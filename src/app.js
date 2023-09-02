const express = require("express");
const { handleAddExpense, handleGetExpenses } = require("./handlers/expense-handlers");

const {
  handleGetSignUp,
  handleGetSignIn,
  handleSignUp,
  handleSignIn,
  handleValidateUsername,
  handleSignOut,
} = require("./handlers/auth-handlers");

const { logRequest } = require("./middleware/request-logger");
const { parseCookies } = require("./middleware/cookie-parser");
const { handleAuth } = require("./middleware/auth-handler");

const addPublicHandlers = (app) => {
  app.use(logRequest);
  app.use(express.json());
  app.use(parseCookies);
  app.get("/test", (_, res) => res.end("Bye World!!!"));
  app.get("/validate-username", handleValidateUsername);
  app.get("/sign-up", handleGetSignUp);
  app.get("/sign-in", handleGetSignIn);
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
