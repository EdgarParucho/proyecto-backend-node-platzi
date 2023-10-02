module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret"
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
  mySQLService: {
    host: process.env.host || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  postService: {
    port: process.env.POST_SRV_PORT || 3002,
  }
};
