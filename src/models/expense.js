class Expense {
  #title;
  #amount;
  #date;
  #id;
  constructor(title, amount, date, id) {
    this.#title = title;
    this.#amount = amount;
    this.#date = date;
    this.#id = id;
  }

  get details() {
    return {
      title: this.#title,
      amount: this.#amount,
      date: this.#date,
      id: this.#id,
    };
  }
}

module.exports = Expense;
