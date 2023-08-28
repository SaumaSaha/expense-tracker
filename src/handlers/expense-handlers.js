const Expense = require("../models/expense");

const sendExpenseAdded = (req, res, expenseId, totalExpense) => {
  res.status(201).json({ expenseId, totalExpense });
};

const handleAddExpense = (req, res) => {
  const { expenses, idGenerator, dataStorage } = req.app;
  const { title, amount, date } = req.body;
  const { name } = req.cookies;

  const expenseId = idGenerator.generateExpenseId();

  const expense = new Expense(title, amount, date, expenseId, name);
  expenses.add(expense);

  const { totalExpense } = expenses.getDetails(name);
  dataStorage.storeExpenses(expenses.details, () =>
    sendExpenseAdded(req, res, expenseId, totalExpense)
  );
};

const handleGetExpenses = (req, res) => {
  const { expenses } = req.app;
  const { name } = req.cookies;

  res.json(expenses.getDetails(name));
};

module.exports = {
  handleAddExpense,
  handleGetExpenses,
};
