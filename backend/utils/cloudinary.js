const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dlbcv2oft",
    api_key: "328152399549336",
    api_secret: "0H65YbZcEFwZ481oBl262xycNaU",
});

module.exports = cloudinary;