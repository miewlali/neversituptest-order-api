const History = require("../../database/history");

class HistoryDBService {
    getHistories(criteria, option) {
        const action = "getHistories";
        return new Promise((resolve, reject) => {
            try {
                console.log(`${action} (${global.config.appName} -> DB) ${JSON.stringify(criteria)} ${JSON.stringify(option)}`); //WRITE_LOG
                History.paginate(criteria, option).then(resultData => {
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
    createHistory(data) {
        const action = "createHistory";
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`${action} (${global.config.appName} -> DB) ${JSON.stringify(data)}`); //WRITE_LOG
                History(data).save().then(resultData => {
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
}
module.exports = new HistoryDBService();