const request = require("supertest");
const app = require("../app");
const { Photo } = require("../models");

DESCRIBE("POST /photo/", () => {
  afterAll(async () => {
    // destroy data
    try {
      await Photo.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
});
