const orderManager = require('./managers/order-manager');

class OrderService {
    async getOrders(req, res) {
        try {
            let result = await orderManager.getOrders(req, res);
            console.log(`Response (${global.config.appName} -> Client) ${JSON.stringify(result)}`) //WRITE_LOG
            //WRITE_SUMMARY
            res.status(result.status).send(result.body);
        } catch (error) {
            console.log(`Error response (${global.config.appName} -> Client) ${error.body}`)
            res.status(error.status).send(error.body);
        }
    }
    async getOrder(req, res) {
        try {
            let result = await orderManager.getOrder(req, res);
            console.log(`Response (${global.config.appName} -> Client) ${JSON.stringify(result)}`) //WRITE_LOG
            //WRITE_SUMMARY
            res.status(result.status).send(result.body);
        } catch (error) {
            console.log(`Error response (${global.config.appName} -> Client) ${error.body}`)
            res.status(error.status).send(error.body);
        }
    }
    async createOrder(req, res) {
        try {
            let result = await orderManager.createOrder(req, res);
            console.log(`Response (${global.config.appName} -> Client) ${JSON.stringify(result)}`) //WRITE_LOG
            //WRITE_SUMMARY
            res.status(result.status).send(result.body);
        } catch (error) {
            console.log(error)
            console.log(`Error response (${global.config.appName} -> Client) ${error.body}`);            
            res.status(error.status).send(error.body);
        }
    }
    async updateOrderStatus(req, res) {
        try {
            let result = await orderManager.updateOrderStatus(req, res);
            console.log(`Response (${global.config.appName} -> Client) ${JSON.stringify(result)}`) //WRITE_LOG
            //WRITE_SUMMARY
            res.status(result.status).send(result.body);
        } catch (error) {
            console.log(error)
            console.log(`Error response (${global.config.appName} -> Client) ${error.body}`)
            res.status(error.status).send(error.body);
        }
    }

}

module.exports = new OrderService();