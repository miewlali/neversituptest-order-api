module.exports = {
    noContentType: function (req, res, next) {
        console.log(`Request (Client -> ${global.config.appName}) ${req.method} ${req.originalUrl}`); //WRITE_LOG
        next();
    },
    json:function (req, res, next) {
        console.log(`Request (Client -> ${global.config.appName}) ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`); //WRITE_LOG
        next();
    }
}
