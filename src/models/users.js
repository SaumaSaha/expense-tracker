class Users {
  #users;

  constructor(users = []) {
    this.#users = users;
  }

  #findUserBy(name) {
    return this.#users.find((user) => (user.details.name = name));
  }

  add(user) {
    this.#users.push(user);
  }

  isUsernameExists(name) {
    const user = this.#findUserBy(name);
    return user !== undefined;
  }

  isValidLoginCredentials(name, password) {
    const user = this.#findUserBy(name) || {};
    return user.details.password === password;
  }

  get details() {
    return this.#users.map((user) => user.details);
  }
}

module.exports = Users;
