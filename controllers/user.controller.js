const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const models = require("../models");
const { Photo, User } = models;

module.exports = {
  getAllUser: async (req, res) => {
    const data = await User.findAll();
    res.json({ data });
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const data = await User.create({ username, email, password });
      const response = {
        id: data.id,
        username: data.username,
        email: data.email,
      };
      res.status(201).json({ response });
      // res.send("sip");
    } catch (error) {
      res.status(error?.code || 500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const search = await User.findOne({ where: { email } });

      if (!search) {
        res.status(404).json({ message: "email didn't exist" });
        return;
      }
      const isAuth = comparePassword(password, search.password);
      if (!isAuth) {
        res.status(404).json({ message: "your password maybe incorrect" });
        return;
      }
      const payload = { id: search.id, email: email };

      const token = generateToken(payload);
      res.status(200).json({ message: "login succes", token });
    } catch (error) {
      res.status(error?.code || 500).json(error);
    }
  },
  getUserById: async (req, res) => {},
  updateUserById: async (req, res) => {},
  deleteUserById: async (req, res) => {},
};
