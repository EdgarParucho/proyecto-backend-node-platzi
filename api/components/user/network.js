const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index.js");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.delete("/", remove);

function list (req, res) {
  Controller.list()
    .then((list) => response.success(req, res, list, 200))
    .catch((error) => response.error(req, res, error.message, 500))
};

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch((error) => response.error(req, res, error.message, 500))
};

function upsert(req, res) {
  Controller.upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((error) => response.error(req, res, error.message, 500))
};

function remove(req, res) {
  Controller.remove(req.params.id)
    .then((id) => response.success(req, res, id, 200))
    .catch((error) => response.error(req, res, error.message, 500))
};

module.exports = router;
