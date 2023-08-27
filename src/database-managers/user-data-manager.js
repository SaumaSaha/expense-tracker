class UserDataStorage {
  #storagePath;
  #fileSystem;

  constructor(storagePath, fileSystem) {
    this.#storagePath = storagePath;
    this.#fileSystem = fileSystem;
  }

  #isFilePresent() {
    return this.#fileSystem.existsSync(this.#storagePath);
  }

  store(data, onSuccess) {
    this.#fileSystem.writeFile(this.#storagePath, JSON.stringify(data), onSuccess);
  }

  init() {
    if (this.#isFilePresent()) {
      const data = this.#fileSystem.readFileSync(this.#storagePath, "utf-8");
      return JSON.parse(data);
    }

    this.#fileSystem.writeFileSync(this.#storagePath, JSON.stringify([]));
  }
}

module.exports = UserDataStorage;
