"use strict";

var multer = require('multer');

var storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //     cb(null, 'uploads/');
  // },
  filename: function filename(req, file, cb) {
    var uniqueFilename = "".concat(Date.now(), "-").concat(file.originalname);
    cb(null, uniqueFilename);
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;