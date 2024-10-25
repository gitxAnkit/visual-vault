const Album = require("../models/albumModel");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// @desc Create new album 
// @route POST /albums
// @access Private
const handleCreateAlbum = catchAsyncErrors(async (req, res, next) => {
    const { albumName } = req.body;

    // Check if album already exists
    const existingAlbum = await Album.findOne({ albumName });
    if (existingAlbum) {
        return next(new ErrorHandler("Album with this name already exists.", 400));
    }

    const album = await Album.create({ albumName });

    res.status(201).json({
        success: true,
        album,
        message: "Album created successfully"
    });
});

// @desc Get all albums 
// @route GET /albums
// @access Private
const handleGetAlbums = catchAsyncErrors(async (req, res) => {
    const albums = await Album.find();
    res.status(200).json({ albums });
});

// @desc Rename album
// @route GET /album/:id
// @access Private
const handleAlbumRename = catchAsyncErrors(async (req, res, next) => {

    const { newAlbumName } = req.body;

    const album = await Album.findById(req.params.id);
    album.albumName = newAlbumName;
    await album.save();

    return res.status(200).json({
        success: true,
        message: "Album name Updated"
    })
})
module.exports = { handleCreateAlbum, handleGetAlbums, handleAlbumRename };
