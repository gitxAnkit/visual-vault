const mongoose = require('mongoose');

// Define the schema for image upload
const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    albumName: {
        type: String
    },
    album_id: {
        type: String,
    }

});

// Create a model using the schema
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
