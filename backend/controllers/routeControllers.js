const cloudinary = require('../utils/cloudinary');
const Image = require('../models/imageModel');

async function handleUploadImage(req, res) {

    try {
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

        console.log("Upload result: ", result);
        res.json({
            imageUrl,
            public_id: result.public_id
        });
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
}

async function handleGetImage(req, res) {
    try {
        const images = await Image.find();

        console.log("Images:", images);

        res.json({ images });
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
    }
}
async function handleDeleteImage(req, res) {
    try {

        const result = await Image.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        res.json({
            success: true,
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete image"
        });
    }
}

async function handleUpdateImageTitle(req, res) {
    try {
        const { newTitle } = req.body;
        const img = await Image.findById(req.params.id);
        if (!img) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }
        img.title = newTitle;
        await img.save();

        return res.json({
            success: true,
            message: "Title updated"
        })


    } catch (error) {
        console.error('Error updating image title:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update image"
        });

    }
}
async function handleUpdateImageDescription(req, res) {
    try {
        const { newDescription } = req.body;
        const img = await Image.findById(req.params.id);
        if (!img) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }
        img.description = newDescription;
        await img.save();

        return res.json({
            success: true,
            message: "Description updated"
        })


    } catch (error) {
        console.error('Error updating image description:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update description"
        });

    }
}


module.exports = {
    handleUploadImage,
    handleGetImage,
    handleDeleteImage,
    handleUpdateImageTitle,
    handleUpdateImageDescription
}