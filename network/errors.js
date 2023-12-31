const response = require("./response");

function errors(err, req, res, next) {
  console.log("An error ocurred.", err);
  const message = err.message || "Internal server error";
  const status = err.statusCode || 500;
  response.error(req, res, message, status)
}

module.exports = errors;
