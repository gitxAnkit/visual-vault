const mongoose = require('mongoose');

// Define the schema for image upload
const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageData: {
        type: Buffer, // Store image data as binary data
        required: true
    },
    contentType: {
        type: String, // MIME type of the image
        required: true
    }
});

// Create a model using the schema
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
