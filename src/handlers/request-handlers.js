const Expense = require("../models/expense");

const handleAddExpense = (req, res) => {
  const { expenses, idGenerator } = req.app;
  const { title, amount, date } = req.body;

  const expenseId = idGenerator.generateExpenseId();
  const expense = new Expense(title, amount, date, expenseId);
  expenses.add(expense);
  const totalExpense = expenses.calculateTotalExpense();

  res.status(201).json({ expenseId, totalExpense });
};

const handleGetExpenses = (req, res) => {
  const { expenses } = req.app;

  res.json(expenses.details);
};

const handleSignUp = (req, res) => {
  const { userDataManager, idGenerator } = req.app;
  const { name, password } = req.body;

  let message = "User Already Exists";

  const onSuccess = () => {
    message = "Sign Up successful";
    res.status(201).json({ message });
  };

  if (userDataManager.isUsernamePresent(name)) {
    message = "Username Already Exists";
    res.status(403).json({ message });
    return;
  }

  const userId = idGenerator.generateUserId();
  userDataManager.store(name, password, userId, onSuccess);
};

module.exports = { handleAddExpense, handleGetExpenses, handleSignUp };
