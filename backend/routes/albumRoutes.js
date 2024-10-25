const express = require("express");
const { handleCreateAlbum, handleGetAlbums, handleAlbumRename } = require("../controllers/albumControllers");

const router = express.Router();

router.route("/albums")
    .get(handleGetAlbums)
    .post(handleCreateAlbum);
router.route("/album/:id").delete();
router.route("/album/:id/rename").put(handleAlbumRename);


module.exports = router;
