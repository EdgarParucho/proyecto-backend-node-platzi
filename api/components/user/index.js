// const store = require("../../../store/mysql");
const store = require("../../../store/remoteMYSQL");
const ctrl = require("./controller");

module.exports = ctrl(store);
