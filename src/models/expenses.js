class Expenses {
  #expenses;

  constructor(expenses = []) {
    this.#expenses = expenses;
  }

  add(expense) {
    this.#expenses.push(expense);
  }

  calculateTotalExpense() {
    return this.#expenses.reduce((totalExpense, expense) => {
      return totalExpense + expense.details.amount;
    }, 0);
  }

  get details() {
    const details = this.#expenses.map((expense) => expense.details);
    const totalExpense = this.calculateTotalExpense();
    return { details, totalExpense };
  }
}

module.exports = Expenses;
