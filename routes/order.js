const express = require('express');
const router = express.Router();

const order = require('../controllers/order');

const middleware = require('../middlewares/common-middleware')

router.get('/', middleware.noContentType, order.getOrders)
router.get('/:id/detail', middleware.noContentType, order.getOrder)
router.post('/create', middleware.json, order.createOrder)
router.patch('/status/:id', middleware.json, order.updateOrderStatus)

module.exports = router;
