const request = require("supertest");

const app = require("../../app");

const database = require("../utils/database");

describe("routes", () => {
  beforeAll(async done => {
    await database.populate();
    done();
  });

  afterAll(async done => {
    await database.drop();
    await database.disconnect();
    done();
  });

  describe("/songs", () => {
    describe("GET", () => {
      describe("200 status code", () => {
        it("when given valid `limit` and `page` query string values the songs are returned", done => {
          request(app)
            .get("/songs")
            .query({ page: 1, limit: 10 })
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res) => {
              const result = res.body;
              expect(result).toHaveLength(4);
              expect(result[0].title).toBe("Test1.mp3");
              expect(result[1].title).toBe("Test2.mp3");
              expect(result[2].title).toBe("Test3.mp3");
              done();
            });
        });

        it("when given a page and limit value as query string values only that amount of songs are only returned", done => {
          request(app)
            .get("/songs")
            .query({ page: 1, limit: 2 })
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res) => {
              const result = res.body;
              expect(result).toHaveLength(2);
              expect(result[0].title).toBe("Test1.mp3");
              expect(result[1].title).toBe("Test2.mp3");
              done();
            });
        });

        it("when no songs can be found with the given page and limit query string values an empty array is returned", done => {
          request(app)
            .get("/songs")
            .query({ page: 10, limit: 2 })
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res) => {
              const result = res.body;
              expect(result).toHaveLength(0);
              done();
            });
        });
      });
      describe("400 status code", () => {
        it("when no limit is passed in as a query string", done => {
          request(app)
            .get("/songs")
            .query({ page: 1 })
            .set("Accept", "application/json")
            .expect(400, done);
        });
        it("when no page is passed in as a query string", done => {
          request(app)
            .get("/songs")
            .query({ limit: 1 })
            .set("Accept", "application/json")
            .expect(400, done);
        });
        it("when the query string `limit` is not a number", done => {
          request(app)
            .get("/songs")
            .query({ limit: "test", page: 1 })
            .set("Accept", "application/json")
            .expect(400, done);
        });
        it("when the query string `page` is not a number", done => {
          request(app)
            .get("/songs")
            .query({ limit: 1, page: "test" })
            .set("Accept", "application/json")
            .expect(400, done);
        });
      });
    });
  });
});
