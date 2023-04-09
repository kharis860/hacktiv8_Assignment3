const express = require("express");
const router = express.Router();
const photoRouter = require("../routes/photo.router");
const UserRouter = require("../routes/user.router");

router.use("/photo", photoRouter);
router.use("/user", UserRouter);
module.exports = router;
