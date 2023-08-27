const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../src/app");
const IdGenerator = require("../src/models/id-generator");
const Expenses = require("../src/models/expenses");
const testData = require("../test-data/expenses.json");
const { createExpenses } = require("../src/expense-creator");

const debug = (val, msg = "") => {
  console.log(val, msg);
  return val;
};

describe("App", () => {
  describe("GET /", () => {
    it("should give the home page content", (_, done) => {
      const app = createApp();

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
      const expenses = new Expenses(debug(testExpenses));
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
        .expect(201)
        .expect("content-type", /application\/json/)
        .expect({ expenseId: 1 })
        .end(done);
    });
  });
});
