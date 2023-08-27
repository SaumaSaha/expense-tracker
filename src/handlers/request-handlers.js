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

// eslint-disable-next-line max-statements
const handleSignUp = (req, res) => {
  const { userDataManager, idGenerator } = req.app;
  const { name, password } = req.body;

  let message = "User Already Exists";

  const onSuccess = () => {
    message = "Sign Up successful";
    res.status(201).json({ message });
  };
  const onError = () => {
    res.status(500);
  };

  if (userDataManager.isUsernamePresent(name)) {
    message = "Username Already Exists";
    res.status(403).json({ message });
    return;
  }

  const userId = idGenerator.generateUserId();
  userDataManager.store(name, password, userId, { onSuccess, onError });
};

module.exports = { handleAddExpense, handleGetExpenses, handleSignUp };