const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController')

router.post('/', orderControllers.createOrder);
router.get('/', orderControllers.getAllOrders);
router.get('/:orderId', orderControllers.getOrderById);
router.put('/:orderId', orderControllers.updateOrderStatus);
router.delete('/:orderId', orderControllers.deleteOrderById);

module.exports = router