const multer = require('multer');

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/');
    // },
    filename: function (req, file, cb) {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;