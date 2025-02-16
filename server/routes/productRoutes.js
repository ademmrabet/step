const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/multerConfig');


router.post('/product', upload.array('productImg', 5), productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/product/:productId', productController.getProductById);
router.put('/product/:productId', upload.array('productImg', 5), productController.updateProductById);
router.delete('/product/:productId', productController.deleteProductById);

module.exports = router;
