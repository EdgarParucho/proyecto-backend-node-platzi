const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index.js");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.patch("/:id", update);

function list(req, res, next) {
  Controller.list()
    .then((data) => response.success(req, res, data, 200))
    .catch(next)
};

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next)
};

function update(req, res, next) {
  Controller.update({ id: req.params.id, ...req.body })
    .then((data) => response.success(req, res, data, 200))
    .catch(next)
};

module.exports = router;
