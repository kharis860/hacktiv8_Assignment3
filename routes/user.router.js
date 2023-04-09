const express = require("express");
const router = express.Router();
const { getAllUser, getUserById, addUser, updateUserById, deleteUserById } = require("../controllers/user.controller");

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
