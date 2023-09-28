const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"))
const { api } = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");

// routes
app.use("/api/user", user);
app.use("/api/auth", auth);

app.listen(api.port, () => console.log("Running on port: ", api.port));
