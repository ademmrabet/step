const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const upload = require('../utils/multerConfig'); // Import multer config

router.post(
    '/',
    upload.fields([{ name: 'logoWhite', maxCount: 1 }, { name: 'logoBlack', maxCount: 1 }]),
    brandController.createBrand
); // Accept logo upload
router.put(
    '/:brandId',
    upload.fields([{ name: 'logoWhite', maxCount: 1 }, { name: 'logoBlack', maxCount: 1 }]),
    brandController.updateBrandById
); // Allow logo updates

router.get('/', brandController.getAllBrands);
router.get('/:brandId', brandController.getBrandById);
router.delete('/:brandId', brandController.deleteBrandById);

module.exports = router;
