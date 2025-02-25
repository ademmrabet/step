const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js')

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId', orderController.updateOrderStatus);
router.delete('/:orderId', orderController.deleteOrderById);

module.exports = router