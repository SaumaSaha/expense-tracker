const Expense = require("./models/expense");

const createExpenses = (expensesDetails, idGenerator) => {
  return expensesDetails.map(({ title, amount, date, username }) => {
    const expenseId = idGenerator.generateExpenseId();
    return new Expense(title, amount, date, expenseId, username);
  });
};

module.exports = { createExpenses };
