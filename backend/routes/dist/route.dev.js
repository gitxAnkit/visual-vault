"use strict";

var express = require('express');

var _require = require("../controllers/routeControllers"),
    handleGetImage = _require.handleGetImage,
    handleUploadImage = _require.handleUploadImage;

var upload = require('../middlewares/multer');

var router = express.Router();
router.route("/api/images").post(upload.single('image'), handleUploadImage).get(handleGetImage);
module.exports = router;