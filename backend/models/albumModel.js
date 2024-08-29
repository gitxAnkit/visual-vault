const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    albumName: {
        type: String,
        unique: true,
        required: [true, "Album name is required"],
        trim: true,
    }
}, {
    timestamps: true,
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
