const moment = require('moment');

const orderDBService = require('../../service-helpers/db-services/order-db-service');
const historyDBService = require('../../service-helpers/db-services/history-db-service');
const StatusEnum = require('../../enums/order-status');
const EventEnum = require('../../enums/order-event');
const { now } = require('mongoose');

class OrderManager {
    async getOrders(req, res) {
        /* function check connection DB */

        let result = await orderDBService.getOrders({}, getPaginationSearchOption(req.query)).catch(err => {
            throw { status: err.status, body: err.message }
        })

        if (result.docs.length == 0) {
            throw { status: 404, body: 'Data not found' }
        }

        return ({ status: 200, body: result })
    }

    async getOrder(req, res) {
        /* function check connection DB */

        let result = await orderDBService.getOrder({ _id: req.params.id }).catch(err => {

            throw { status: err.status, body: err.message }
        })

        if (!result) {
            throw { status: 404, body: 'Data not found' }
        }
        return ({ status: 200, body: result })
    }

    async createOrder(req, res) {
        /* function check connection DB */

        /* validate body */

        let order = {
            _id: Math.floor(Math.random() * 1000) + 1000,
            orderNo: `OR${moment().format("YYMMDD")}${Math.floor(Math.random() * 9999) + 1001}`,
            buyer: req.body.buyer,
            status: StatusEnum.AwaitingShipment,
            orderItems: req.body.orderItems,
            deliveryAddress: req.body.deliveryAddress,
            billingAddress: req.body.billingAddress,
            createdBy: req.body.buyer.username
        }

        order.orderItems.forEach(item => {
            item.totalPrice = parseInt(item.price) * parseInt(item.quantity);
        });

        let history = {
            orderId: order._id,
            orderEventName: EventEnum.CreateOrder,
            createdBy: req.headers.username
        }
        let parallelFunction = async function () {
            let createOrder = orderDBService.createOrder(order);
            let createHistory = historyDBService.createHistory(history);
            return {
                createOrder: await createOrder,
                createHistory: await createHistory
            }
        }
        let dbServiceResults = await parallelFunction();
        if (!dbServiceResults.createOrder || !dbServiceResults.createHistory._id) throw { status: 500, body: 'Internal Server Error' };

        return ({ status: 200, body: order._id })
    }

    async updateOrderStatus(req, res) {
        /* function check connection DB */

        /* validate body */

        /* validate authorize */

        let getOrder = await orderDBService.getOrder({ _id: req.params.id })

        if (!getOrder) {
            throw { status: 404, body: 'Data not found' }
        }

        let data = prepareDataUpdateStatus(getOrder.status, req.body.status);
        console.log(!data.update)

        if (!data.update) {
            throw { status: 500, body: 'Internal Server Error' }
        }

        let history = {
            orderId: req.params.id,
            orderEventName: data.eventName
        }

        let parallelFunction = async function () {
            let updateOrder = orderDBService.updateOrder({ _id: req.params.id }, data.update);
            let createHistory = historyDBService.createHistory(history);
            return {
                updateOrder: await updateOrder,
                createHistory: await createHistory
            }
        }
        let dbServiceResults = await parallelFunction();
        if (!dbServiceResults.updateOrder.acknowledged || !dbServiceResults.createHistory._id) throw { status: 500, body: 'Internal Server Error' };

        return { status: 200 }
    }
}

function getPaginationSearchOption(query) {
    let option = { lean: true, leanWithId: false, limit: 10, page: 1 };
    if (query.sortBy) {
        option.sort = query.sortBy.replace(",", " ");
    }
    if (query.limit && Utility.isNumber(parseInt(query.limit))) {
        option.limit = parseInt(query.limit);
    }
    if (query.page && Utility.isNumber(parseInt(query.page))) {
        option.page = parseInt(query.page);
    }
    return option;
}

function prepareDataUpdateStatus(orderStatus, updateStatus) {
    let data = {};
    if (updateStatus == StatusEnum.Cancelled && orderStatus == StatusEnum.AwaitingShipment) {
        data.update = { $set: { status: StatusEnum.Cancelled, updatedDate: new Date() } };
        data.eventName = EventEnum.CancelOrder;
    }
    if (updateStatus == StatusEnum.Shipped && orderStatus == StatusEnum.AwaitingShipment) {
        data.update = { $set: { status: StatusEnum.Shipped, updatedDate: new Date() } };
        data.eventName = EventEnum.Shipping;
    }
    if (updateStatus == StatusEnum.Delivered && orderStatus == StatusEnum.Shipped) {
        data.update = { $set: { status: StatusEnum.Delivered, updatedDate: new Date() } };
        data.eventName = EventEnum.Delivered;
    }
    return data;
}

module.exports = new OrderManager();