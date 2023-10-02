const express = require("express");
const app = express();

const config = require("../config");
const router = require("./network")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(config.mySQLService.port, () => {
  console.log("MySQL service on port: ", config.mySQLService.port)
});
