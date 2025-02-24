const multer = require('multer');
const path = require('path');

//configuration de stockage pour l'upload des images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check request path to determine upload folder
        if (req.baseUrl.includes('/api/brands')) {
            cb(null, 'uploads/brands/'); // Save logos in 'uploads/brands/'
        } else if (req.baseUrl.includes('/api/products')) {
            cb(null, 'uploads/products/'); // Save product images in 'uploads/products/'
        } else {
            cb(null, 'uploads/'); // Default folder
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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