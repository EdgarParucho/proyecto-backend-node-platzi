const ctrl = require("./controller");
const config = require("../../../config");
let store, cache;

if (config.remoteDB) {
  store = require("../../../store/remoteMYSQL")
  cache = require("../../../store/remoteCache")
} else {
  store = require("../../../store/mysql")
  cache = require("../../../store/redis")
}

module.exports = ctrl(store, cache);
