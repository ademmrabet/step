const multer = require('multer');
const path = require('path');

//configuration de stockage pour l'upload des images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); //save files to uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter =  (req, file, cb ) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }else {
        cb(new Error('Only image files are allowed!'), false)
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;