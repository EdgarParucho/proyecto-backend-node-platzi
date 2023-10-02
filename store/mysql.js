const mysql = require("mysql");

const config = require("../config");

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConf);
  connection.connect((err) => {
    if (!err) return console.log("DB connected");
    console.error('[dbError]', err);
    setTimeout(handleCon, 2000);
  });
  connection.on("error", err => {
    console.error("[dbError]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") handleCon();
    else throw new Error(err);
  })
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

function upsert({ table, body, updating = false }) {
  if (updating) return update(table, body);
  else return insert(table, body);
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const [key] = Object.keys(join);
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result) => {
      if (err) return reject(err)
      resolve(result[0] || null)
    })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
