const fetchAddExpensePage = () => {
  location.assign("/pages/add-expense.html");
};

const createMessageElement = (name) => {
  const messageElement = document.createElement("span");
  messageElement.innerText = `👤 ${name}`;

  return messageElement;
};

const showUserName = (name) => {
  const authSection = document.querySelector("#auth-section");
  const messageElement = createMessageElement(name);

  authSection.prepend(messageElement);
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

const validateUsername = () => {
  fetch("/validate-username")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(({ name }) => showUserName(name));
};

const main = () => {
  addListeners();
  fetchExpenses();
  validateUsername();
};

window.onload = main;
