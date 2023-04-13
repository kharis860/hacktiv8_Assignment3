const request = require("supertest");
const app = require("../app");
const { Photo, User } = require("../models");
const { generateToken } = require("../helpers/jwt");
let token;
let userCreate;
describe("POST /photo/", () => {
  beforeAll(async () => {
    try {
      userCreate = await User.create({
        username: "andi",
        email: "andi@gmail.com",
        password: "andi123",
      });
      //       console.log(cred.data);
      token = generateToken({
        id: userCreate.id,
        username: userCreate.username,
        email: userCreate.email,
      });
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  });
  // create photo succes response
  it("create photo response 201", (done) => {
    request(app)
      .post("/photo/")
      .send({
        title: "photo doooni new",
        caption: "caption photo doni new",
        image_url: "https://picsum.photos/seed/picsum/200/300",
      })
      .set("authorization", `Bearer ${token}`)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        console.log(res.body.response, "test create photo succes (with token)");
        expect(res.body.response).toHaveProperty("id");
        expect(res.body.response).toHaveProperty("title");
        expect(res.body.response.title).toEqual("photo doooni new");
        expect(res.body.response).toHaveProperty("caption");
        expect(res.body.response.caption).toEqual("caption photo doni new");
        expect(res.body.response).toHaveProperty("image_url");
        expect(res.body.response.image_url).toEqual("https://picsum.photos/seed/picsum/200/300");
        expect(res.body.response).toHaveProperty("UserId");
        expect(res.body.response.UserId).toEqual(userCreate.id);
        expect(res.body.response).toHaveProperty("createdAt");
        expect(res.body.response).toHaveProperty("updatedAt");
        done();
        //         expect(res.body.response).toHaveProperty("title");
      });
  });
  // create photo error response
  it("create photo response 404", (done) => {
    request(app)
      .post("/photo/")
      .send({
        title: "photo doooni new",
        caption: "caption photo doni new",
        image_url: "https://picsum.photos/seed/picsum/200/300",
      })
      .set("authorization", "")
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        console.log(res.body, "test create photo error (token)");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("token not provided");
        //         done();
        //         expect(res.body.response).toHaveProperty("title");
        done();
      });
  });
  afterAll(async () => {
    // destroy data
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});

describe("GET /photo/", () => {
  beforeAll(async () => {
    try {
      // const dataUser = verifyToken(token);
      // console.log(dataUser.id);
      userCreate = await User.create({
        username: "andi",
        email: "andi@gmail.com",
        password: "andi123",
      });
      photoCreate = await Photo.create({
        title: "photo testing",
        caption: "caption photo testing",
        image_url: "https://picsum.photos/seed/picsum/200/300",
        UserId: userCreate.id,
      });
      //       console.log(cred.data);
      token = generateToken({
        id: userCreate.id,
        username: userCreate.username,
        email: userCreate.email,
      });
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  });

  // Get all photo succes response
  it("get all photo response 200", (done) => {
    request(app)
      .get("/photo/")
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        console.log(res.body.data[0], "get all photo succes (with token)");
        expect(res.body.data[0]).toHaveProperty("id");
        expect(res.body.data[0].id).toEqual(photoCreate.id);
        expect(res.body.data[0]).toHaveProperty("title");
        expect(res.body.data[0].title).toEqual("photo testing");
        expect(res.body.data[0]).toHaveProperty("caption");
        expect(res.body.data[0].caption).toEqual("caption photo testing");
        expect(res.body.data[0]).toHaveProperty("image_url");
        expect(res.body.data[0].image_url).toEqual("https://picsum.photos/seed/picsum/200/300");
        expect(res.body.data[0]).toHaveProperty("UserId");
        expect(res.body.data[0].UserId).toEqual(userCreate.id);
        expect(res.body.data[0]).toHaveProperty("createdAt");
        expect(res.body.data[0]).toHaveProperty("updatedAt");
        expect(res.body.data[0]).toHaveProperty("User");
        expect(res.body.data[0].User).toHaveProperty("username");
        expect(res.body.data[0].User.username).toEqual(userCreate.username);
        expect(res.body.data[0].User).toHaveProperty("email");
        expect(res.body.data[0].User.email).toEqual(userCreate.email);
        done();
      });
  });

  // Get all photo error response
  it("get all photo response 404", (done) => {
    request(app)
      .get("/photo/")
      .set("authorization", ``)
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        console.log(res.body, "test get all photo error");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("token not provided");
        done();
      });
  });
  afterAll(async () => {
    // destroy data
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});

describe("GET /photo/:id", () => {
  beforeAll(async () => {
    try {
      userCreate = await User.create({
        username: "andi",
        email: "andi@gmail.com",
        password: "andi123",
      });
      photoCreate = await Photo.create({
        title: "photo testing",
        caption: "caption photo testing",
        image_url: "https://picsum.photos/seed/picsum/200/300",
        UserId: userCreate.id,
      });
      token = generateToken({
        id: userCreate.id,
        username: userCreate.username,
        email: userCreate.email,
      });
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  });

  // Get photo by id succes response
  it("get photo by id response 200", (done) => {
    // const cred = verifyToken(token);
    // console.log(cred);
    request(app)
      .get(`/photo/${photoCreate.id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        console.log(res.body.data, "test get photo by id (with token)");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data.id).toEqual(photoCreate.id);
        expect(res.body.data).toHaveProperty("title");
        expect(res.body.data.title).toEqual("photo testing");
        expect(res.body.data).toHaveProperty("caption");
        expect(res.body.data.caption).toEqual("caption photo testing");
        expect(res.body.data).toHaveProperty("image_url");
        expect(res.body.data.image_url).toEqual("https://picsum.photos/seed/picsum/200/300");
        expect(res.body.data).toHaveProperty("UserId");
        expect(res.body.data.UserId).toEqual(userCreate.id);
        expect(res.body.data).toHaveProperty("createdAt");
        expect(res.body.data).toHaveProperty("updatedAt");

        // expect(res.body.data.createdAt).toEqual(photoCreate.createdAt);
        // expect(res.body.data.updatedAt).toEqual(photoCreate.updatedAt);
        // console.log(photoCreate.createdAt);

        // todooo: di console log berupa date, di subtitusi malah string
        done();
      });
  });

  // Get photo by id error response
  it("get photo by id response 404", (done) => {
    request(app)
      .get(`/photo/1`)
      .set("authorization", `Bearer ${token}`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        console.log(res.body, "test error get photo by id (with token) data not found");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("data not found");
        done();
      });
  });
  afterAll(async () => {
    // destroy data
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    // destroy data
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});
