const postExpense = () => {
  const title = document.querySelector("#expense-title-text-box").value;
  const amount = document.querySelector("#expense-amount-text-box").value;
  const date = document.querySelector("#expense-date-text-box").value;

  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title, amount, date }),
  };

  fetch("/expenses", request).then((res) => {
    if (res.status === 201) {
      location.assign("/index.html");
      return;
    }

    alert("Server Error");
  });
};

const main = () => {
  const addExpenseBtn = document.querySelector("#add-expense-btn");
  const form = document.querySelector("#add-expense-form");

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  addExpenseBtn.onclick = () => postExpense();
};
window.onload = main;
