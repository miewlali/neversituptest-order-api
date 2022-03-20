class ConfigurationStructure {
    constructor(param) {
        this.appName = param.appName;
        this.port = param.port;
        this.mongo = new Mongo(param.mongo);
    }
}

class Mongo {
    constructor(param) {
        this.dbHost = param.dbHost;
        this.dbUri = param.dbUri;
    }
}

module.exports = ConfigurationStructure;
