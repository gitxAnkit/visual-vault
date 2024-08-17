const cloudinary = require('../utils/cloudinary');
const Image = require('../models/imageModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const handleUploadImage = catchAsyncErrors(async (req, res) => {

    const { path } = req.file;
    let { title, description } = req.body;
    const result = await cloudinary.uploader.upload(path, {
        public_id: req.file.filename,
        folder: 'visual-vault',

    });
    const imageUrl = result.secure_url;

    await Image.create({
        title: title,
        description: description,
        public_id: result.public_id,
        url: imageUrl,
    })
    res.status(201).json({
        imageUrl,
        public_id: result.public_id
    });
});

const handleGetImage = catchAsyncErrors(async (req, res) => {

    const images = await Image.find();
    res.status(200).json({ images });
});

const handleDeleteImage = catchAsyncErrors(async (req, res, next) => {

    const image = await Image.findById(req.params.id);
    // const image = await Image.findOne(req.params.url);
    if (!image) {
        return next(new ErrorHandler("Image not found!", 404));
    }

    // Delete the image from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(image.public_id);

    if (cloudinaryResult.result !== 'ok') {

        return next(new ErrorHandler("Failed to delete image from cloudinary"));
    }

    // Delete the image from the database
    await Image.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Image deleted successfully"
    });

});

const handleUpdateImageTitle = catchAsyncErrors(async (req, res, next) => {

    const { newTitle } = req.body;
    const img = await Image.findById(req.params.id);
    if (!img) {
        return next(new ErrorHandler("Image not found", 404));
    }
    img.title = newTitle;
    await img.save();

    return res.status(200).json({
        success: true,
        message: "Title updated"
    })
});

const handleUpdateImageDescription = catchAsyncErrors(async (req, res, next) => {

    const { newDescription } = req.body;
    const img = await Image.findById(req.params.id);
    if (!img) {
        return next(new ErrorHandler("Image not found", 404));
    }
    img.description = newDescription;
    await img.save();

    return res.json({
        success: true,
        message: "Description updated"
    })
});


module.exports = {
    handleUploadImage,
    handleGetImage,
    handleDeleteImage,
    handleUpdateImageTitle,
    handleUpdateImageDescription
}