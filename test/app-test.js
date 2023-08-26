const { describe, it, beforeEach } = require("node:test");
const request = require("supertest");
const { createApp } = require("../src/app");

let app = null;

describe("/", () => {
  describe("GET /", () => {
    beforeEach(() => {
      app = createApp();
    });
    it("should give the home page content", (_, done) => {
      request(app)
        .get("/")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });

  describe("GET /public/add-expense.html", () => {
    beforeEach(() => {
      app = createApp();
    });
    it("should give the add expense page content", (_, done) => {
      request(app)
        .get("/pages/add-expense.html")
        .expect(200)
        .expect("content-type", /text\/html/)
        .end(done);
    });
  });
});
