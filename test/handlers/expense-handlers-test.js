const { describe, it } = require("node:test");
const request = require("supertest");

const Expenses = require("../../src/models/expenses");
const IdGenerator = require("../../src/models/id-generator");
const DataStorage = require("../../src/database/user-data-storage");

const { createApp } = require("../../src/app");
const { createExpenses } = require("../../src/expense-creator");

const testExpensesData = require("../../test-data/test-expenses.json");
const Users = require("../../src/models/users");
const User = require("../../src/models/user");

const TEST_USER_STORAGE = "./test-data/test-user-storage.json";
const TEST_EXPENSES_STORAGE = "./test-data/test-expenses-storage.json";

describe("GET /", () => {
  it("should give the home page content", (_, done) => {
    const app = createApp(null, null, null, null);

    request(app)
      .get("/")
      .expect(200)
      .expect("content-type", /text\/html/)
      .end(done);
  });
});

describe("GET /public/add-expense.html", () => {
  it("should give the add expense page content", (_, done) => {
    const user = new User("sauma", "1234", 1);
    const users = new Users([user]);
    const app = createApp(users, null, null, null);

    request(app)
      .get("/pages/add-expense.html")
      .set("cookie", "name=sauma")
      .expect(200)
      .expect("content-type", /text\/html/)
      .end(done);
  });
});

describe("GET /expenses", () => {
  it("should get the expenses", (_, done) => {
    const idGenerator = new IdGenerator();
    const testExpenses = createExpenses(testExpensesData, idGenerator);
    const expenses = new Expenses(testExpenses);
    const user = new User("sauma", "1234", 1);
    const users = new Users([user]);
    const app = createApp(users, expenses, idGenerator, null);

    request(app)
      .get("/expenses")
      .set("cookie", "name=sauma")
      .expect(200)
      .expect("content-type", /application\/json/)
      .expect({ details: testExpensesData, totalExpense: 8000 })
      .end(done);
  });

  it("should redirect to sign in page if no cookie is sent", (_, done) => {
    const idGenerator = new IdGenerator();
    const testExpenses = createExpenses(testExpensesData, idGenerator);
    const expenses = new Expenses(testExpenses);
    const user = new User("sauma", "1234", 1);
    const users = new Users([user]);
    const app = createApp(users, expenses, idGenerator, null);

    request(app)
      .get("/expenses")
      .expect(303)
      .expect("location", "/pages/sign-in.html")
      .end(done);
  });
});

describe("POST /expenses", () => {
  it("should post an expense", (context, done) => {
    const fs = {
      existsSync: context.mock.fn(() => false),
      readFileSync: context.mock.fn(),
      writeFileSync: context.mock.fn(),
      writeFile: context.mock.fn((path, data, cb) => cb()),
    };

    const expenses = new Expenses();
    const idGenerator = new IdGenerator();
    const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
    dataStorage.init();
    const user = new User("sauma", "1234", 1);
    const users = new Users([user]);
    const app = createApp(users, expenses, idGenerator, dataStorage);

    request(app)
      .post("/expenses")
      .send({ title: "Rent", amount: 6000, date: "2023-08-27" })
      .set("cookie", "name=sauma")
      .expect(201)
      .expect("content-type", /application\/json/)
      .expect({ expenseId: 1, totalExpense: 6000 })
      .end(done);
  });
});
