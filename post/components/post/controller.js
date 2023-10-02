const TABLE = "post";

module.exports = function(injectedStore) {
  let store = injectedStore || require("../../../store/dummy");

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function update(body) {
    return store.upsert({
      table: TABLE,
      body,
      updating: true,
    });
  }

  return {
    list,
    get,
    update,
  };
}