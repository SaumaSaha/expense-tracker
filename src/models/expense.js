class Expense {
  #title;
  #amount;
  #date;
  #id;
  #username;

  constructor(title, amount, date, id, username) {
    this.#title = title;
    this.#amount = amount;
    this.#date = date;
    this.#id = id;
    this.#username = username;
  }

  get details() {
    return {
      title: this.#title,
      amount: this.#amount,
      date: this.#date,
      id: this.#id,
      username: this.#username,
    };
  }
}

module.exports = Expense;
