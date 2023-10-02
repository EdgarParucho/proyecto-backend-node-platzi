const error = require("../utils/error");

const db = {
  "user": [
    { id: "1", name: "Edgar" },
  ]
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let collection = await list(table);
  const { 0: result } = collection.filter(item => item.id === id)
  return result || null;
}

async function upsert(table, data) {
  if (!db[table]) db[table] = [];
  const collection = await list(table);
  collection.push(data);
  console.log("01");
}

async function remove(table, id) {
  const collection = db[table];
  const itemIndex = collection.findIndex(item => item.id === id);
  collection.splice(itemIndex, 1);
  return id;
}

async function update(table, { id, ...body }) {
  const collection = db[table];
  const itemIndex = collection.findIndex(item => item.id === id);
  if (itemIndex === -1) throw error("Data not found", 404);
  collection[itemIndex] = { ...collection[itemIndex],  ...body };
  return id;
}

async function query(table, q) {
  let collection = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];
  return collection.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
  update
};