class User {
  #name;
  #password;
  #id;

  constructor(name, password, id) {
    this.#name = name;
    this.#password = password;
    this.#id = id;
  }

  get details() {
    return {
      name: this.#name,
      password: this.#password,
      id: this.#id,
    };
  }
}

module.exports = User;
