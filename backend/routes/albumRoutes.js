const express = require("express");
const { handleCreateAlbum, handleGetAlbums, handleAlbumRename } = require("../controllers/albumControllers");

const router = express.Router();

router.route("/api/albums").get(handleGetAlbums);
router.route("/api/albums/create").post(handleCreateAlbum);
router.route("/api/albums/delete/:id").delete();
router.route("/api/albums/rename/:id").put(handleAlbumRename);


module.exports = router;
//Album routes
// get All albums
// router.route("/api/albums") 
//create album
//delete album
//rename album