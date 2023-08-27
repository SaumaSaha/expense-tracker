const fs = require("fs");
const { createApp } = require("./src/app");
const Expenses = require("./src/models/expenses");
const IdGenerator = require("./src/models/id-generator");
const UserDataStorage = require("./src/database-managers/user-data-manager");
const Users = require("./src/models/users");
const { createUsers } = require("./src/user-creator");
const STORAGE_PATH = "./user-data.json";

const main = () => {
  const idGenerator = new IdGenerator();
  const userDataStorage = new UserDataStorage(STORAGE_PATH, fs);

  const restoredUserData = userDataStorage.init();
  const restoredUsers = createUsers(restoredUserData, idGenerator);

  const users = new Users(restoredUsers);
  const expenses = new Expenses();

  const app = createApp(users, expenses, idGenerator, userDataStorage);
  const port = 8000;

  app.listen(port, () => console.log("App listening on port:", port));
};

main();
