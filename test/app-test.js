const { describe, it } = require("node:test");
const request = require("supertest");

const Expenses = require("../src/models/expenses");
const IdGenerator = require("../src/models/id-generator");
const UserDataManager = require("../src/database-managers/user-data-manager");

const { createApp } = require("../src/app");
const { createExpenses } = require("../src/expense-creator");

const testData = require("../test-data/expenses.json");
const TEST_STORAGE = "./test-data/test-user-storage.json";

describe("App", () => {
  describe("GET /", () => {
    it("should give the home page content", (_, done) => {
      const app = createApp(null, null, null);

      request(app)
        .get("/")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("GET /public/add-expense.html", () => {
    it("should give the add expense page content", (_, done) => {
      const app = createApp(null, null, null);

      request(app)
        .get("/pages/add-expense.html")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("GET /expenses", () => {
    it("should get the expenses", (_, done) => {
      const idGenerator = new IdGenerator();
      const testExpenses = createExpenses(testData, idGenerator);
      const expenses = new Expenses(testExpenses);
      const app = createApp(expenses, idGenerator, null);

      request(app)
        .get("/expenses")
        .expect(200)
        .expect("content-type", /application\/json/)
        .expect({ details: testData, totalExpense: 8000 })
        .end(done);
    });
  });

  describe("POST /expenses", () => {
    it("should post an expense", (_, done) => {
      const expenses = new Expenses();
      const idGenerator = new IdGenerator();
      const app = createApp(expenses, idGenerator, null);

      request(app)
        .post("/expenses")
        .send({ title: "Rent", amount: 6000, date: "2023-08-27" })
        .expect(201)
        .expect("content-type", /application\/json/)
        .expect({ expenseId: 1, totalExpense: 6000 })
        .end(done);
    });
  });

  describe("GET /pages/sign-up.html", () => {
    it("should give the sign up page", (_, done) => {
      const app = createApp(null, null, null);

      request(app)
        .get("/pages/sign-up.html")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("POST /sign-up", () => {
    it("should post the user name and password", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => false),
        readFileSync: context.mock.fn(),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn((path, data, cb) => cb()),
      };

      const idGenerator = new IdGenerator();
      const userDataManager = new UserDataManager(TEST_STORAGE, fs);
      userDataManager.init();

      const app = createApp(null, idGenerator, userDataManager);

      request(app)
        .post("/sign-up")
        .send({ name: "sauma", password: "123456" })
        .expect(201)
        .expect({ message: "Sign Up successful" })
        .end(done);
    });

    it("should give forbidden error if the user name already exists", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => {
          // eslint-disable-next-line quotes
          return '{"sauma": { "username": "sauma", "password": "123456" }}';
        }),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn(),
      };

      const idGenerator = new IdGenerator();
      const userDataManager = new UserDataManager(TEST_STORAGE, fs);
      userDataManager.init();
      const app = createApp(null, idGenerator, userDataManager);

      request(app)
        .post("/sign-up")
        .send({ name: "sauma", password: "123456" })
        .expect(403)
        .expect({ message: "Username Already Exists" })
        .end(done);
    });
  });
});
