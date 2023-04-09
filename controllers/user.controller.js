const models = require("../models");
const { Photo, User } = models;
const bcrypt = require("bcrypt");

module.exports = {
  getAllUser: async (req, res) => {
    const data = await User.findAll();
    res.json({ data });
  },
  getUserById: async (req, res) => {},
  addUser: async (req, res) => {
    const { username, email, password } = req.body;
    const salt = 10;

    const hash = bcrypt.hashSync(password, salt);
  },
  updateUserById: async (req, res) => {},
  deleteUserById: async (req, res) => {},
};
