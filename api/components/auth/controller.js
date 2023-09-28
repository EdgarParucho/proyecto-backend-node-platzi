const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const TABLE = "auth";

module.exports = function(injectedStore) {
  
  let store = injectedStore || require("../../../store/dummy.js");

  async function upsert(data) {
    const authData = {
      ...data,
      password: await bcrypt.hash(data.password, 5),
    };
    return store.upsert(TABLE, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username });
    return bcrypt.compare(password, data.password)
      .then((equal) => {
        if (equal) return auth.sign(data);
        else throw new Error("Invalid data.")
      })
  }

  return {
    upsert, login
  }
}

