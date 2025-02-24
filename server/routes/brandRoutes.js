const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const upload = require('../utils/multerConfig'); // Import multer config

router.post('/', upload.single('logo'), brandController.createBrand); // Accept logo upload
router.put('/:brandId', upload.single('logo'), brandController.updateBrandById); // Allow logo updates

router.get('/', brandController.getAllBrands);
router.get('/:brandId', brandController.getBrandById);
router.delete('/:brandId', brandController.deleteBrandById);

module.exports = router;
