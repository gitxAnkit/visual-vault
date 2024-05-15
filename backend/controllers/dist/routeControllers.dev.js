"use strict";

var cloudinary = require('../utils/cloudinary');

var Image = require('../models/imageModel');

function handleUploadImage(req, res) {
  var path, _req$body, title, description, result, imageUrl;

  return regeneratorRuntime.async(function handleUploadImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          path = req.file.path;
          _req$body = req.body, title = _req$body.title, description = _req$body.description;
          _context.next = 5;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(path, {
            public_id: req.file.filename,
            folder: 'visual-vault'
          }));

        case 5:
          result = _context.sent;
          imageUrl = result.secure_url;
          _context.next = 9;
          return regeneratorRuntime.awrap(Image.create({
            title: title,
            description: description,
            public_id: result.public_id,
            url: imageUrl
          }));

        case 9:
          console.log("Upload result: ", result);
          res.json({
            imageUrl: imageUrl,
            public_id: result.public_id
          });
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('Error uploading image to Cloudinary:', _context.t0);
          res.status(500).json({
            error: 'Failed to upload image to Cloudinary'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

function handleGetImage(req, res) {
  var images;
  return regeneratorRuntime.async(function handleGetImage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Image.find());

        case 3:
          images = _context2.sent;
          console.log("Images:", images);
          res.json({
            images: images
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching images from Cloudinary:', _context2.t0);
          res.status(500).json({
            error: 'Failed to fetch images from Cloudinary'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = {
  handleUploadImage: handleUploadImage,
  handleGetImage: handleGetImage
};