const postExpense = () => {
  const title = document.querySelector("#expense-title-text-box").value;
  const amount = document.querySelector("#expense-amount-text-box").value;
  const date = document.querySelector("#expense-date-text-box").value;

  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title, amount: parseInt(amount), date }),
  };

  fetch("/expenses", request).then((res) => {
    if (res.status === 201) {
      location.replace("/pages/expenses.html");
      return;
    }

    alert("Server Error");
  });
};

const main = () => {
  const form = document.querySelector("#add-expense-form");

  form.onsubmit = (event) => {
    event.preventDefault();
    postExpense();
  };
};
window.onload = main;
