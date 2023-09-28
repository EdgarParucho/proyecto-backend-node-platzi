const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index.js");

const router = express.Router();

router.post("/login", login);

function login(req, res) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => response.success(req, res, token, 200))
    .catch((err) => response.error(req, res, err.message, 400));
}

module.exports = router;
