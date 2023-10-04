const express = require("express");
const app = express();

const config = require("../config");
const router = require("./network")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(config.cacheService.port, () => {
  console.log("Redis service on port: ", config.cacheService.port)
});
