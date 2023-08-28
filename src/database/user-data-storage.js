class DataStorage {
  #userDataStoragePath;
  #expensesStoragePath;
  #fileSystem;

  constructor(userDataStoragePath, expensesStoragePath, fileSystem) {
    this.#userDataStoragePath = userDataStoragePath;
    this.#expensesStoragePath = expensesStoragePath;
    this.#fileSystem = fileSystem;
  }

  #isFilePresent(file) {
    return this.#fileSystem.existsSync(file);
  }

  storeUsers(data, onSuccess) {
    this.#fileSystem.writeFile(
      this.#userDataStoragePath,
      JSON.stringify(data),
      onSuccess
    );
  }

  storeExpenses(data, onSuccess) {
    this.#fileSystem.writeFile(
      this.#expensesStoragePath,
      JSON.stringify(data),
      onSuccess
    );
  }

  #restoreUsers() {
    if (this.#isFilePresent(this.#userDataStoragePath)) {
      const data = this.#fileSystem.readFileSync(this.#userDataStoragePath, "utf-8");
      return JSON.parse(data);
    }

    this.#fileSystem.writeFileSync(this.#userDataStoragePath, JSON.stringify([]));
    return [];
  }

  #restoreExpenses() {
    if (this.#isFilePresent(this.#expensesStoragePath)) {
      const data = this.#fileSystem.readFileSync(this.#expensesStoragePath, "utf-8");
      return JSON.parse(data);
    }

    this.#fileSystem.writeFileSync(this.#expensesStoragePath, JSON.stringify([]));
    return [];
  }

  init() {
    const restoredUsersDetails = this.#restoreUsers();
    const restoredExpensesDetails = this.#restoreExpenses();

    return { restoredUsersDetails, restoredExpensesDetails };
  }
}

module.exports = DataStorage;
