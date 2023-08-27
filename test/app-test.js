const { describe, it } = require("node:test");
const request = require("supertest");

const fs = require("fs");

const Expenses = require("../src/models/expenses");
const IdGenerator = require("../src/models/id-generator");
const UserDataManager = require("../src/database-managers/user-data-storage");

const { createApp } = require("../src/app");
const { createExpenses } = require("../src/expense-creator");

const testData = require("../test-data/expenses.json");
const TEST_STORAGE = "./test-data/test-user-storage.json";

const debug = (val, msg = "") => {
  console.log(val, msg);
  return val;
};

describe("App", () => {
  describe("GET /", () => {
    it("should give the home page content", (_, done) => {
      const app = createApp(null, null);

      request(app)
        .get("/")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("GET /public/add-expense.html", () => {
    it("should give the add expense page content", (_, done) => {
      const app = createApp();

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
      const app = createApp(expenses, idGenerator);

      request(app)
        .get("/expenses")
        .expect(200)
        .expect("content-type", /application\/json/)
        .expect(testData)
        .end(done);
    });
  });

  describe("POST /expenses", () => {
    it("should post an expense", (_, done) => {
      const expenses = new Expenses();
      const idGenerator = new IdGenerator();
      const app = createApp(expenses, idGenerator);

      request(app)
        .post("/expenses")
        .send({ title: "Rent", amount: 6000, date: "2023-08-27" })
        .expect(201)
        .expect("content-type", /application\/json/)
        .expect({ expenseId: 1 })
        .end(done);
    });
  });

  describe("GET /pages/sign-up.html", () => {
    it("should give the sign up page", (_, done) => {
      const app = createApp(null, null);

      request(app)
        .get("/pages/sign-up.html")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("POST /sign-up", () => {
    it("should post the user name and password", (_, done) => {
      const idGenerator = new IdGenerator();
      const userDataManager = new UserDataManager(TEST_STORAGE, fs);
      userDataManager.init();
      const app = createApp(null, idGenerator, userDataManager);

      request(app)
        .post("/sign-up")
        .send(debug({ name: "sauma", password: "123456" }))
        .expect(201)
        .expect({ message: "Sign Up successful" })
        .end(done);
    });
  });
});
