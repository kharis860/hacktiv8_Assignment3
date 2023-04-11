var jwt = require("jsonwebtoken");
const key = "assignment3";

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, key);
  },
  verifyToken: (token) => {
    return jwt.verify(token, key);
  },
};
