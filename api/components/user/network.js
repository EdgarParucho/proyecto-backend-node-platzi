const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response.js");
const Controller = require("./index.js");

const router = express.Router();

router.get("/", list);
router.post("/follow/:id", secure("follow"), follow);
router.get("/:id/following", following);
router.post("/", upsert);
router.delete("/", remove);
router.get("/:id", get);
router.put("/", secure("update"), update);

function list (req, res, next) {
  Controller.list()
    .then((list) => response.success(req, res, list, 200))
    .catch(next)
};

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch(next)
};

function update(req, res, next) {
  Controller.update(req.body)
    .then((user) => response.success(req, res, user, 200))
    .catch(next)
};

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch(next)
};

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((id) => response.success(req, res, id, 200))
    .catch(next)
};

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => response.success(req, res, data, 201))
    .catch(next)
}

function following(req, res, next) {
  Controller.following(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next)
}

module.exports = router;
