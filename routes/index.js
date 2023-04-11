const express = require("express");
const router = express.Router();
const photoRouter = require("../routes/photo.router");
const UserRouter = require("../routes/user.router");
const auth = require("../middlewares/authentication");

router.use("/user", UserRouter);
router.use(auth);
router.use("/photo", photoRouter);
module.exports = router;
