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
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

});

// Create a model using the schema
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
