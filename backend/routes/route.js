const express = require('express');
const { handleGetImage,
    handleUploadImage, } = require("../controllers/routeControllers");
const upload = require('../middlewares/multer');
const router = express.Router();

router.route("/api/images")
    .post(upload.single('image'), handleUploadImage)
    .get(handleGetImage);


module.exports = router;