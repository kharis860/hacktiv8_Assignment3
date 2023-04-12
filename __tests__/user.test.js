const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
// test register
describe("POST /user/register", () => {
  afterAll(async () => {
    // destroy data
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
  // succes test
  it("response 201", (done) => {
    request(app)
      .post("/user/register")
      .send({
        username: "admin1",
        email: "admin1@gmail.com",
        password: "admin1123",
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body.response).toHaveProperty("id");
        expect(res.body.response).toHaveProperty("username");
        expect(res.body.response.username).toEqual("admin1");
        done();
      });
  });

  //   error response
  it("response 500", (done) => {
    request(app)
      .post("/user/register")
      .send({
        username: "admin1",
        email: "admin1@gmail.com",
        password: "admin1123",
      })
      .expect(500)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });
});

describe("POST /user/login", () => {
  beforeAll(async () => {
    try {
      await User.create({
        username: "admin1",
        email: "admin1@gmail.com",
        password: "admin1123",
      });
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    // destroy data
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  it("response login 200", (done) => {
    request(app)
      .post("/user/login")
      .send({
        email: "admin1@gmail.com",
        password: "admin1123",
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toHaveProperty("token");
        done();
      });
  });
});
