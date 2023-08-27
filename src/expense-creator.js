const Expense = require("./models/expense");

const createExpenses = (expensesDetails, idGenerator) => {
  return expensesDetails.map(({ title, amount, date }) => {
    const expenseId = idGenerator.generateExpenseId();
    return new Expense(title, amount, date, expenseId);
  });
};

module.exports = { createExpenses };
