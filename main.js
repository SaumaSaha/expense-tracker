const fs = require("fs");
const { createApp } = require("./src/app");
const Expenses = require("./src/models/expenses");
const IdGenerator = require("./src/models/id-generator");
const UserDataStorage = require("./src/database/user-data-storage");
const Users = require("./src/models/users");
const { createUsers } = require("./src/user-creator");
const { createExpenses } = require("./src/expense-creator");
const USER_DATA_STORAGE_PATH = "./user-data.json";
const EXPENSES_DATA_STORAGE_PATH = "./expenses-data.json";

const main = () => {
  const idGenerator = new IdGenerator();
  const dataStorage = new UserDataStorage(
    USER_DATA_STORAGE_PATH,
    EXPENSES_DATA_STORAGE_PATH,
    fs
  );

  const { restoredUsersDetails, restoredExpensesDetails } = dataStorage.init();
  const restoredUsers = createUsers(restoredUsersDetails, idGenerator);
  const restoredExpenses = createExpenses(restoredExpensesDetails, idGenerator);

  const users = new Users(restoredUsers);
  const expenses = new Expenses(restoredExpenses);

  const app = createApp(users, expenses, idGenerator, dataStorage);
  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log("APP LISTENING ON PORT :", port));
};

main();
