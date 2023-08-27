const fs = require("fs");
const { createApp } = require("./src/app");
const UserDataManager = require("./src/database-managers/user-data-manager");
const Expenses = require("./src/models/expenses");
const IdGenerator = require("./src/models/id-generator");
const STORAGE_PATH = "./user-data.json";

const main = () => {
  const expenses = new Expenses();
  const idGenerator = new IdGenerator();
  const userDataManager = new UserDataManager(STORAGE_PATH, fs);
  userDataManager.init();

  const app = createApp(expenses, idGenerator, userDataManager);
  const port = 8000;

  app.listen(port, () => console.log("App listening on port:", port));
};

main();
