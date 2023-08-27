const fetchAddExpensePage = () => {
  location.assign("/pages/add-expense.html");
};

const addListeners = () => {
  const addExpenseBtn = document.querySelector("#add-expense-btn");
  addExpenseBtn.onclick = () => fetchAddExpensePage();
};

const fetchExpenses = () => {
  fetch("/expenses")
    .then((res) => res.json())
    .then((expensesDetails) => render(expensesDetails));
};

const main = () => {
  addListeners();
  fetchExpenses();
};

window.onload = main;
