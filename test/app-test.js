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
      request(app).get("/").expect(200).expect("Home Page").end(done);
    });
  });
});
