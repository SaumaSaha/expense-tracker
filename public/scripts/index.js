const fetchAddExpensePage = () => {
  location.assign("/pages/add-expense.html");
};

const main = () => {
  const addExpenseBtn = document.querySelector("#add-expense-btn");
  addExpenseBtn.onclick = () => fetchAddExpensePage();
};

window.onload = main;
