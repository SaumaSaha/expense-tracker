const { createApp } = require("./src/app");
const Expenses = require("./src/models/expenses");
const IdGenerator = require("./src/models/id-generator");

const main = () => {
  const expenses = new Expenses();
  const idGenerator = new IdGenerator();

  const app = createApp(expenses, idGenerator);
  const port = 8000;

  app.listen(port, () => console.log("App listening on port:", port));
};

main();
