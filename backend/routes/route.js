const express = require('express');
const { handleGetImage,
    handleUploadImage, handleDeleteImage,
    handleUpdateImageTitle,
    handleUpdateImageDescription } = require("../controllers/routeControllers");
const upload = require('../middlewares/multer');
const router = express.Router();

router.route("/api/images").get(handleGetImage);
router.route("/api/images/upload").post(upload.single('image'), handleUploadImage);
router.route("/api/images/delete/:id").delete(handleDeleteImage);

router.route("/api/images/update/title/:id").put(handleUpdateImageTitle);
router.route("/api/images/update/description/:id").put(handleUpdateImageDescription);



module.exports = router;