const remote = require("./remote");
const config = require("../config");

module.exports = new remote(config.mySQLService.host, config.mySQLService.port);
