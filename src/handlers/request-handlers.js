const Expense = require("../models/expense");

const handleAddExpense = (req, res) => {
  const { expenses, idGenerator } = req.app;
  const { title, amount, date } = req.body;

  const expenseId = idGenerator.generateExpenseId();
  const expense = new Expense(title, amount, date, expenseId);
  expenses.add(expense);

  res.status(201).json({ expenseId });
};

const handleGetExpenses = (req, res) => {
  const { expenses } = req.app;

  res.json(expenses.details);
};

module.exports = { handleAddExpense, handleGetExpenses };
