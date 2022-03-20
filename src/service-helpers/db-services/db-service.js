const mongoose = require("mongoose");
mongoose.set("debug", true);

class DBService {
    constructor() {
        initDBManager();
    }

    closeConnection() {
        mongoose.connection.close().catch(err => {
            console.log("closeConnection error: " + err.toString()); //WRITE_LOG 
        }
        )
    }
}

function initDBManager() {
    mongoose
        .connect(
            "mongodb://" + global.config.mongo.dbHost + global.config.mongo.dbUri,
            {
                useNewUrlParser: true,
                connectTimeoutMS: 2000,
                autoIndex: false,
                useUnifiedTopology: true
            }
        )
        .then((result) => {
            console.log("InitDBManager successfully Url : mongodb:" + global.config.mongo.dbHost + global.config.mongo.dbUri); //WRITE_LOG
        })
        .catch(err => {
            console.log("InitDBManager error : " + err.toString()); //WRITE_LOG  
        });
}

let dbService = new DBService();
module.exports = dbService;

process.on("exit", function () {
    dbService.closeConnection();
});