class IdGenerator {
  #expenseId;

  constructor() {
    this.#expenseId = 0;
  }

  generateExpenseId() {
    this.#expenseId += 1;
    return this.#expenseId;
  }
}

module.exports = IdGenerator;
