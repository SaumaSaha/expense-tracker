const { describe, it } = require("node:test");
const { deepStrictEqual } = require("assert");
const Expenses = require("../../src/models/expenses");
const Expense = require("../../src/models/expense");

describe("Expenses", () => {
  describe("add", () => {
    it("should add the expense to the list of expenses", () => {
      const expenses = new Expenses();
      const expense = new Expense("Rent", 6000, "2023-09-05", 1, "sauma");

      expenses.add(expense);

      const actualExpensesDetails = expenses.allDetails;
      const expectedExpensesDetails = [
        {
          title: "Rent",
          amount: 6000,
          date: "2023-09-05",
          id: 1,
          username: "sauma",
        },
      ];

      deepStrictEqual(actualExpensesDetails, expectedExpensesDetails);
    });
  });

  describe("getDetails", () => {
    it("should give total expenses 0 and no details if the user has no expenses", () => {
      const expenses = new Expenses();
      const expense = new Expense("Rent", 6000, "2023-09-05", 1, "sauma");
      expenses.add(expense);

      const actualExpenses = expenses.getDetails("milan");
      const expectedExpenses = { details: [], totalExpense: 0 };

      deepStrictEqual(actualExpenses, expectedExpenses);
    });

    it("should give the details and total expenses of the given user", () => {
      const expenses = new Expenses();
      const expense1 = new Expense("Rent", 6000, "2023-09-05", 1, "sauma");
      const expense2 = new Expense("Food", 500, "2023-08-31", 3, "milan");
      const expense3 = new Expense("Clothes", 2000, "2023-09-02", 2, "sauma");

      expenses.add(expense1);
      expenses.add(expense2);
      expenses.add(expense3);

      const actualExpenses = expenses.getDetails("sauma");
      const expectedExpenses = {
        details: [
          {
            title: "Rent",
            amount: 6000,
            date: "2023-09-05",
            id: 1,
            username: "sauma",
          },
          {
            title: "Clothes",
            amount: 2000,
            date: "2023-09-02",
            id: 2,
            username: "sauma",
          },
        ],
        totalExpense: 8000,
      };

      deepStrictEqual(actualExpenses, expectedExpenses);
    });
  });

  describe("allDetails", () => {
    it("should give all the expenses details present", () => {
      const expenses = new Expenses();
      const expense1 = new Expense("Rent", 6000, "2023-09-05", 1, "sauma");
      const expense2 = new Expense("Food", 500, "2023-08-31", 3, "milan");
      const expense3 = new Expense("Clothes", 2000, "2023-09-02", 2, "sauma");

      expenses.add(expense1);
      expenses.add(expense2);
      expenses.add(expense3);

      const actualExpenses = expenses.allDetails;
      const expectedExpenses = [
        {
          title: "Rent",
          amount: 6000,
          date: "2023-09-05",
          id: 1,
          username: "sauma",
        },
        {
          title: "Food",
          amount: 500,
          date: "2023-08-31",
          id: 3,
          username: "milan",
        },
        {
          title: "Clothes",
          amount: 2000,
          date: "2023-09-02",
          id: 2,
          username: "sauma",
        },
      ];

      deepStrictEqual(actualExpenses, expectedExpenses);
    });
  });
});
