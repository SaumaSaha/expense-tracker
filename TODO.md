What is an expense tracker ?
=> An expense tracker is a program that tracks all your expenditures so that the user can have a clear and detailed understanding of how much they are spending and on what.

  What does an expense tracker consist of ?
  => An expense tracker consist of
    total expense
    expenses

  What can be done in the expense tracker ?
  => add expense
  => total expense

What is an expense ?
=> A thing on which one has spend money.

  What does an expense consist of ?
  => Title (where the amount is spent ex - Rent/Food/Clothes)
  => Amount spent
  => Date

  What can be done with an expense ?
  => Change amount
  => Change title
  => delete expense

What is a total expense ?
=> Total expense is the total amount spent by the user


Models
---
User
Users
Expense

---

User
  fields:
    name;
    id;

  methods:
    getDetails() => will give all the details of the user(name,id)

---

Users => will keep the data of the logged in users
  fields:
    users;

  methods:
    addUser()
    removeUser()
    getDetails(userId, name)

---

Expenses
  fields:
    expenses; => it will hold the expenses of the logged in users;

  methods:
    addExpense(userId, expenseDetails)
    deleteExpense(expenseId)
    getExpenses(userId)
    #calculateTotalExpense(userId) => will calculate the total expense of the given user

---

Expense
  fields:
    id;
    userId;
    title;
    amount;
    data;

  methods:
    getId()
    changeTitle()
    changeAmount()
    getDetails()
