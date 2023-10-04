const { nanoid } = require("nanoid");
const auth = require("../auth");

const TABLE = "user";

module.exports = function(injectedStore, injectedCache) {
  let cache = injectedCache || require("../../../store/dummy.js");
  let store = injectedStore || require("../../../store/dummy.js");

  async function list() {
    let users = await cache.list(TABLE);
    if (users) return users;
    console.log("Not found in cache");
    users = await store.list(TABLE);
    cache.upsert(TABLE, users); 
    return users;
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert({ id = nanoid(), name, username, password }) {
    const user = { id, name, username };
    if (password || username) await auth.upsert({ id, username, password });
    return store.upsert({ table: TABLE, body: user });
  }

  async function update({ id, name, username }) {
    return store.upsert({
      table: TABLE,
      body: { id, name, username },
      updating: true
    });
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function follow(from, to) {
    return store.upsert({
      table: TABLE + "_follow",
      body: {
        user_from: from,
        user_to: to,
      }
    })
  }

  async function following(user) {
    const join = {};
    join [TABLE] = "user_to"; // { user: user_to }
    const query = { user_from: user };
    return await store.query(TABLE + "_follow", query, join);
  }

  return {
    list,
    get,
    upsert,
    remove,
    update,
    follow,
    following,
  };
}

