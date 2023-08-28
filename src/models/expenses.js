class Expenses {
  #expenses;

  constructor(expenses = []) {
    this.#expenses = expenses;
  }

  add(expense) {
    this.#expenses.push(expense);
  }

  calculateTotalExpense(details) {
    return details.reduce((totalExpense, expense) => {
      return totalExpense + expense.amount;
    }, 0);
  }

  getDetails(name) {
    const userExpenses = this.#expenses.filter(
      (expense) => expense.details.username === name
    );

    const details = userExpenses.map((expense) => expense.details);
    const totalExpense = this.calculateTotalExpense(details);

    return { details, totalExpense };
  }

  get details() {
    return this.#expenses.map((expense) => expense.details);
  }
}

module.exports = Expenses;
