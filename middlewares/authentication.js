const { verifyToken } = require("../helpers/jwt");
const models = require("../models");
const { User } = models;

const auth = async (req, res, next) => {
  try {
    // kondisional exist bearer token
    const cred = req.headers.authorization;
    if (!cred) {
      res.status(404).json({
        message: "token not provided",
      });
      return;
    }
    // mengambil data dari header dan komparasi token
    const tokenAuth = req.headers.authorization.split(" ")[1];
    // ambil credential dari verify jwt
    const isAuth = verifyToken(tokenAuth);
    const loadEmail = isAuth.email;
    const loadId = isAuth.id;
    // ambil credential dari database
    const { id, email, username } = await User.findOne({ where: { id: loadId, email: loadEmail } });
    const isGranted = id === loadId && email === loadEmail;
    if (!isGranted) {
      res.status(404).json({
        message: "your email or password didn't valid",
      });
    }
    req.UserData = {
      id,
      email,
      username,
    };
    return next();
  } catch (error) {
    res.status(error?.code || 500).json(error);
  }
};

module.exports = auth;
