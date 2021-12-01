const express = require("express");
const router = express.Router();
const uploadImagesController = require("../controllers/uploadImagesController");

router.post("/", uploadImagesController.uploadImage);

module.exports = router;

