const express = require('express');
const { handleGetImage,
    handleUploadImage,
    handleDeleteImage,
    handleUpdateImageTitle,
    handleUpdateImageDescription } = require("../controllers/imageControllers");
const upload = require('../middlewares/multer');
const router = express.Router();

// Image routes
router.route("/images")
    .get(handleGetImage)
    .post(upload.single('image'), handleUploadImage);

router.route("/image/:id")
    .delete(handleDeleteImage);

router.route("/image/:id/title")
    .put(handleUpdateImageTitle);

router.route("/image/:id/description")
    .put(handleUpdateImageDescription);

module.exports = router;