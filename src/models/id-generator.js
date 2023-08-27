class IdGenerator {
  #expenseId;
  #userId;

  constructor() {
    this.#expenseId = 0;
    this.#userId = 0;
  }

  generateExpenseId() {
    this.#expenseId += 1;
    return this.#expenseId;
  }

  generateUserId() {
    this.#userId += 1;
    return this.#userId;
  }
}

module.exports = IdGenerator;
