const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema({
    albumName: {
        type: String,
        unique: true,
    }

});
const Album = mongoose.model("albums", AlbumSchema);

module.exports = Album;