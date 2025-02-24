const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

router.post('/', discountController.createDiscount);
router.get('/', discountController.getAllDiscounts);
router.get('/:code', discountController.getDiscountByCode);
router.put('/:code', discountController.updateDiscountByCode);
router.delete('/:code', discountController.deleteDiscountByCode);

module.exports = router;
