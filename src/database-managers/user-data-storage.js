class UserDataManager {
  #userData;
  #storagePath;
  #fileSystem;

  constructor(storagePath, fileSystem) {
    this.#storagePath = storagePath;
    this.#fileSystem = fileSystem;
    this.#userData = {};
  }

  #isFilePresent() {
    return this.#fileSystem.existsSync(this.#storagePath);
  }

  isUsernamePresent(name) {
    return name in this.#userData;
  }

  store(username, password, userId, { onSuccess, onError }) {
    this.#userData[username] = { username, password, userId };

    this.#fileSystem.writeFile(
      this.#storagePath,
      JSON.stringify(this.#userData),
      (err) => {
        if (err) {
          onError();
          return;
        }
        onSuccess();
      }
    );
  }

  init() {
    if (this.#isFilePresent()) {
      const data = this.#fileSystem.readFileSync(this.#storagePath, "utf-8");
      this.#userData = JSON.parse(data);
    }

    this.#fileSystem.writeFileSync(this.#storagePath, JSON.stringify(this.#userData));
  }
}

module.exports = UserDataManager;
