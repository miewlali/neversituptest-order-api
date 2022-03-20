const config = require("./configs/"+(process.env.MODE || "dev")+"-app-configuration.json");
let ConfigurationStructure = require("./configs/configuration-structure");
global.config = new ConfigurationStructure(config);

const app = require("./common/app");

let port = process.env.PORT || global.config.port || 3000;

app.listen(port, () => {
    console.log("Starting server on port: " + port);
});