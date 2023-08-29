const addExpenseClass = (listItem) => {
  listItem.classList.add("expense");
};

const getDateDiff = (date) => {
  const [year, month, day] = date.split("-");
  const [currentDay, currentMonth, currentYear] = new Date()
    .toLocaleDateString()
    .split("/");

  return (
    new Date(currentYear, +currentMonth - 1, currentDay) - new Date(year, +month - 1, day)
  );
};

const generateDateString = (date) => {
  const dateStringLookUp = {
    86400000: "Yesterday",
    0: "Today",
  };

  const diff = getDateDiff(date);
  return dateStringLookUp[diff] || date;
};

const createDateElement = (date) => {
  const dateElement = document.createElement("span");
  const dateString = generateDateString(date);

  dateElement.innerText = dateString;

  return dateElement;
};
const createTitleElement = (title) => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;

  return titleElement;
};
const createAmountElement = (amount) => {
  const amountElement = document.createElement("span");
  amountElement.innerText = `₹ ${amount}`;

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
const render = ({ details, totalExpense }) => {
  const expensesSection = document.querySelector("#expenses");
  const totalExpenseElement = document.querySelector("#total-expense");
  totalExpenseElement.innerText = totalExpense;
  const expenseElements = details.map(createExpenseElement);

  expensesSection.append(...expenseElements);
};
