const { nanoid } = require("nanoid");
const auth = require("../auth");

const TABLE = "user";

module.exports = function(injectedStore) {
  
  let store = injectedStore || require("../../../store/dummy.js");

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert(body) {
    const user = { id: nanoid(), ...body };
    if (body.password || body.username) await auth.upsert({ ...user });
    return store.upsert(TABLE, user);
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    list,
    get,
    upsert,
    remove,
  };
}

