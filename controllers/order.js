const orderService = require('../src/services/order-service');

class Order {
    async getOrders(req, res) {
        orderService.getOrders(req, res);
    }
    async getOrder(req, res) {
        orderService.getOrder(req, res);
    }
    async createOrder(req, res) {
        orderService.createOrder(req, res);
    }
    async updateOrderStatus(req, res) {
        orderService.updateOrderStatus(req, res);
    }
}

module.exports = new Order();
