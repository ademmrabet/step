const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/multerConfig');


router.post('/', upload.array('productImg', 5), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', upload.array('productImg', 5), productController.updateProductById);
router.delete('/:productId', productController.deleteProductById);

module.exports = router;
