const express = require("express");
const router = express.Router();
const { getAllPhoto, getPhotoById, addPhoto, updatePhotoById, deletePhotoById } = require("../controllers/photo.controller");

router.get("/", getAllPhoto);
router.get("/:id", getPhotoById);
router.post("/", addPhoto);
router.put("/:id", updatePhotoById);
router.delete("/:id", deletePhotoById);

module.exports = router;
