class Expenses {
  #expenses;

  constructor(expenses = []) {
    this.#expenses = expenses;
  }

  add(expense) {
    this.#expenses.push(expense);
  }

  get details() {
    return this.#expenses.map((expense) => expense.details);
  }
}

module.exports = Expenses;
