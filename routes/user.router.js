const express = require("express");
const router = express.Router();
const { getAllUser, getUserById, updateUserById, deleteUserById, register, login } = require("../controllers/user.controller");

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
