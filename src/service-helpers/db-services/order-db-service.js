const Order = require("../../database/order");

class OrderDBService {
    getOrders(criteria, option) {
        const action = "getOrders";
        return new Promise((resolve, reject) => {
            try {
                console.log(`${action} (${global.config.appName} -> DB) ${JSON.stringify(criteria)} ${JSON.stringify(option)}`); //WRITE_LOG
                Order.paginate(criteria, option).then(resultData => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${JSON.stringify(resultData)}`); //WRITE_LOG
                    resolve(resultData);
                }).catch(err => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${err.toString()}`); //WRITE_LOG
                    reject({ status: 500, message: 'Database Error' });
                });
            } catch (error) {
                console.log(`Unknown error occured(${this.constructor.name}) ${error}`); //WRITE_LOG
                reject({ status: 500, message: 'System Error' });
            }
        });
    }
    getOrder(criteria) {
        const action = "getOrder";
        return new Promise((resolve, reject) => {
            try {
                console.log(`${action} (${global.config.appName} -> DB) ${JSON.stringify(criteria)}`); //WRITE_LOG
                Order.findOne(criteria).lean().then(resultData => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${JSON.stringify(resultData)}`); //WRITE_LOG
                    resolve(resultData);
                }).catch(err => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${err.toString()}`); //WRITE_LOG
                    reject({ status: 500, message: 'Database Error' });
                });
            } catch (error) {
                console.log(`Unknown error occured(${this.constructor.name}) ${error}`); //WRITE_LOG
                reject({ status: 500, message: 'System Error' });
            }
        });
    }
    createOrder(data) {
        const action = "createOrder";
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`${action} (${global.config.appName} -> DB) ${JSON.stringify(data)}`); //WRITE_LOG
                Order(data).save().then(resultData => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${JSON.stringify(resultData)}`); //WRITE_LOG
                    resolve(resultData);
                }).catch(err => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${err.toString()}`); //WRITE_LOG
                    reject({ status: 500, message: 'Database Error' });
                });
            } catch (error) {
                console.log(`Unknown error occured(${this.constructor.name}) ${error}`); //WRITE_LOG
                reject({ status: 500, message: 'System Error' });
            }
        }
        )
    }
    updateOrder(condition, updateData) {
        const action = "updateOrder";
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`${action} (${global.config.appName} -> DB) ${JSON.stringify(updateData)}`); //WRITE_LOG
                Order.updateOne(condition, updateData)
                .then(resultData => {
                    console.log(`${action} (DB -> ${global.config.appName}) ${JSON.stringify(resultData)}`); //WRITE_LOG
                    resolve(resultData);
                }).catch(err => {
                        console.log(`${action} (DB -> ${global.config.appName}) ${err.toString()}`); //WRITE_LOG
                        reject({ status: 500, message: 'Database Error' });
                    });
            } catch (error) {
                console.log(`Unknown error occured(${this.constructor.name}) ${error}`); //WRITE_LOG
                reject({ status: 500, message: 'System Error' });
            }
        });
    }
}
module.exports = new OrderDBService();