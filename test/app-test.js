const { describe, it } = require("node:test");
const request = require("supertest");

const Expenses = require("../src/models/expenses");
const IdGenerator = require("../src/models/id-generator");
const DataStorage = require("../src/database/user-data-storage");

const { createApp } = require("../src/app");
const { createExpenses } = require("../src/expense-creator");

const testExpensesData = require("../test-data/test-expenses.json");
const { createUsers } = require("../src/user-creator");
const Users = require("../src/models/users");
const User = require("../src/models/user");
const TEST_USER_STORAGE = "./test-data/test-user-storage.json";
const TEST_EXPENSES_STORAGE = "./test-data/test-expenses-storage.json";

describe("App", () => {
  describe("GET /", () => {
    it("should give the home page content", (_, done) => {
      const app = createApp(null, null, null, null);

      request(app)
        .get("/")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("GET /public/add-expense.html", () => {
    it("should give the add expense page content", (_, done) => {
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, null, null, null);

      request(app)
        .get("/pages/add-expense.html")
        .set("cookie", "name=sauma")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("GET /expenses", () => {
    it("should get the expenses", (_, done) => {
      const idGenerator = new IdGenerator();
      const testExpenses = createExpenses(testExpensesData, idGenerator);
      const expenses = new Expenses(testExpenses);
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, expenses, idGenerator, null);

      request(app)
        .get("/expenses")
        .set("cookie", "name=sauma")
        .expect(200)
        .expect("content-type", /application\/json/)
        .expect({ details: testExpensesData, totalExpense: 8000 })
        .end(done);
    });

    it("should redirect to sign in page if no cookie is sent", (_, done) => {
      const idGenerator = new IdGenerator();
      const testExpenses = createExpenses(testExpensesData, idGenerator);
      const expenses = new Expenses(testExpenses);
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, expenses, idGenerator, null);

      request(app)
        .get("/expenses")
        .expect(303)
        .expect("location", "/pages/sign-in.html")
        .end(done);
    });
  });

  describe("POST /expenses", () => {
    it("should post an expense", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => false),
        readFileSync: context.mock.fn(),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn((path, data, cb) => cb()),
      };

      const expenses = new Expenses();
      const idGenerator = new IdGenerator();
      const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
      dataStorage.init();
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, expenses, idGenerator, dataStorage);

      request(app)
        .post("/expenses")
        .send({ title: "Rent", amount: 6000, date: "2023-08-27" })
        .set("cookie", "name=sauma")
        .expect(201)
        .expect("content-type", /application\/json/)
        .expect({ expenseId: 1, totalExpense: 6000 })
        .end(done);
    });
  });

  describe("GET /pages/sign-up.html", () => {
    it("should give the sign up page", (_, done) => {
      const app = createApp(null, null, null, null);

      request(app)
        .get("/pages/sign-up.html")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("POST /sign-up", () => {
    it("should sign up user with the user name and password", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => false),
        readFileSync: context.mock.fn(),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn((path, data, cb) => cb()),
      };

      const idGenerator = new IdGenerator();
      const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
      dataStorage.init();
      const users = new Users();

      const app = createApp(users, null, idGenerator, dataStorage);

      request(app)
        .post("/sign-up")
        .send({ name: "sauma", password: "123456" })
        .expect(201)
        .expect({ message: "Sign Up successful" })
        .end(done);
    });

    it("should give forbidden error if the user name already exists", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => {
          // eslint-disable-next-line quotes
          return '[{"name": "sauma", "password": "123456", "id":1 }]';
        }),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn(),
      };

      const idGenerator = new IdGenerator();
      const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
      const { restoredUsersDetails } = dataStorage.init();
      const restoredUsers = createUsers(restoredUsersDetails, idGenerator);
      const users = new Users(restoredUsers);

      const app = createApp(users, null, idGenerator, dataStorage);

      request(app)
        .post("/sign-up")
        .send({ name: "sauma", password: "123456" })
        .expect(403)
        .end(done);
    });
  });

  describe("POST /sign-in", () => {
    it("should sign the user in if credentials are valid", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => {
          // eslint-disable-next-line quotes
          return '[{ "name": "sauma", "password": "123456", "id": 1 }]';
        }),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn(),
      };

      const idGenerator = new IdGenerator();
      const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
      const { restoredUsersDetails } = dataStorage.init();
      const restoredUsers = createUsers(restoredUsersDetails, idGenerator);
      const users = new Users(restoredUsers);

      const app = createApp(users, null, idGenerator, dataStorage);

      request(app)
        .post("/sign-in")
        .send({ name: "sauma", password: "123456" })
        .expect(200)
        .expect("set-cookie", "name=sauma; Path=/")
        .end(done);
    });

    it("should not sign the user in if password is not valid", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => {
          // eslint-disable-next-line quotes
          return '[{ "name": "sauma", "password": "123456", "id": 1 }]';
        }),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn(),
      };

      const idGenerator = new IdGenerator();
      const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
      const { restoredUsersDetails } = dataStorage.init();
      const restoredUsers = createUsers(restoredUsersDetails, idGenerator);
      const users = new Users(restoredUsers);

      const app = createApp(users, null, idGenerator, dataStorage);

      request(app)
        .post("/sign-in")
        .send({ name: "sauma", password: "123" })
        .expect(403)
        .end(done);
    });

    it("should not sign the user in if name is not valid", (context, done) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => {
          // eslint-disable-next-line quotes
          return '[{ "name": "sauma", "password": "123456", "id": 1 }]';
        }),
        writeFileSync: context.mock.fn(),
        writeFile: context.mock.fn(),
      };

      const idGenerator = new IdGenerator();
      const dataStorage = new DataStorage(TEST_USER_STORAGE, TEST_EXPENSES_STORAGE, fs);
      const { restoredUsersDetails } = dataStorage.init();
      const restoredUsers = createUsers(restoredUsersDetails, idGenerator);
      const users = new Users(restoredUsers);

      const app = createApp(users, null, idGenerator, dataStorage);

      request(app)
        .post("/sign-in")
        .send({ name: "sourav", password: "123456" })
        .expect(403)
        .end(done);
    });
  });

  describe("GET /validate-username", () => {
    it("should get the user name back if the name in the cookie is valid", (_, done) => {
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, null, null, null);

      request(app)
        .get("/validate-username")
        .set("cookie", "name=sauma")
        .expect(200)
        .expect({ name: "sauma" })
        .end(done);
    });

    it("should get 401 if the name in the cookie is not valid", (_, done) => {
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, null, null, null);

      request(app)
        .get("/validate-username")
        .set("cookie", "name=milan")
        .expect(401)
        .end(done);
    });
  });

  describe("GET /sign-out", () => {
    it("should sign out the user by removing the cookie", (_, done) => {
      const user = new User("sauma", "1234", 1);
      const users = new Users([user]);
      const app = createApp(users, null, null, null);

      request(app)
        .get("/sign-out")
        .set("cookie", "name=sauma")
        .expect(303)
        .expect("set-cookie", "name=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT")
        .expect("location", "/index.html")
        .end(done);
    });
  });
});
