const express = require('express');
const { handleGetImage,
    handleUploadImage,
    handleGetImageById } = require("../controllers/routeControllers");
const multer = require('multer');

const router = express.Router();

router.route("/api/images")
    .post(handleUploadImage)
    .get(handleGetImage);
router.route("/api/images/:id")
    .get(handleGetImageById);

module.exports = router;