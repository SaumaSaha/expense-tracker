const addExpenseClass = (listItem) => {
  listItem.classList.add("expense");
};

const createDateElement = (date) => {
  const dateElement = document.createElement("span");
  dateElement.innerText = date;

  return dateElement;
};
const createTitleElement = (title) => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;

  return titleElement;
};
const createAmountElement = (amount) => {
  const amountElement = document.createElement("span");
  amountElement.innerText = amount;

  return amountElement;
};

const createExpenseElement = ({ title, amount, date }) => {
  const listItem = document.createElement("li");
  const dateElement = createDateElement(date);
  const titleElement = createTitleElement(title);
  const amountElement = createAmountElement(amount);

  listItem.append(dateElement, titleElement, amountElement);
  addExpenseClass(listItem);
  return listItem;
};

// eslint-disable-next-line no-unused-vars
const render = (expensesDetails) => {
  const expenses = document.querySelector("#expenses");
  const expenseElements = expensesDetails.map(createExpenseElement);

  expenses.append(...expenseElements);
};