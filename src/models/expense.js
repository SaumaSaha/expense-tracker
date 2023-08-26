class Expense {
  #title;
  #amount;
  #id;
  constructor(title, amount, id) {
    this.#title = title;
    this.#amount = amount;
    this.#id = id;
  }

  get details() {
    return {
      title: this.#title,
      amount: this.#amount,
      id: this.#id,
    };
  }
}

module.exports = Expense;
