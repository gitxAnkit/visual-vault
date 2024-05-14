
const Image = require("../models/imageModel");
const multer = require('multer');
const fs = require('fs');

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // 'image' is the field name of the file input

const API = `http://localhost:4500/api/images`;

function handleUploadImage(req, res) {
    // Using multer middleware to handle file upload
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ error: 'Failed to upload image' });
        }

        try {
            const { title, description } = req.body;
            const imageData = req.file.buffer; // Access the file buffer provided by multer
            const contentType = req.file.mimetype;

            // Create a new Image document
            const newImage = new Image({
                title,
                description,
                imageData,
                contentType
            });

            // Save the new Image document to the database
            await newImage.save();

            res.status(201).json({ message: 'Image uploaded successfully' });
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        }
    }
    );
}

async function handleGetImage(req, res) {
    try {
        // Fetch all images from the database
        const images = await Image.find({}, 'title description contentType imageData'); // Include imageData

        // Convert each image to Base64-encoded data URI
        const imageUrls = images.map(image => {
            // Convert the binary image data to Base64 encoding
            const imageDataBase64 = image.imageData.toString('base64');

            // Construct the data URI with the appropriate MIME type
            const dataURI = `data:${image.contentType};base64,${imageDataBase64}`;

            return {
                title: image.title,
                description: image.description,
                contentType: image.contentType,
                imageUrl: dataURI // Use the data URI as the image URL
            };
        });

        res.json({ images: imageUrls });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}

async function handleGetImageById(req, res) {
    try {
        // Extract the image ID from the request parameters
        const { id } = req.params;

        // Query the database to find the image by its ID
        const image = await Image.findById(id);

        // If the image is not found, return a 404 Not Found response
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Convert the binary image data to Base64 encoding
        const imageDataBase64 = image.imageData.toString('base64');

        // Combine the Base64-encoded image data with the data URI format
        const imageDataURI = `data:${image.contentType};base64,${imageDataBase64}`;

        // Return the Base64-encoded image data URI in the response
        res.json({ imageUrl: imageDataURI });
    } catch (error) {
        console.error('Error fetching single image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
}

module.exports = {
    handleUploadImage,
    handleGetImage,
    handleGetImageById
}