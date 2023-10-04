const { createClient } = require('redis');
const config = require("../config");

const client = createClient({
  password: config.redis.password,
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  }
});

client.connect()
  .then(() => console.log('Conectado a REDIS'));

async function list(table) {
  const data = await client.get(table);
  return data ? JSON.parse(data) : null;
}

function get(table, id) {
  // 
}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) key = key + "_" + data.id;
  await client.setEx(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
}
