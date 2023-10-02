const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"))

const { postService } = require("../config.js");
const post = require("./components/post/network");

const errors = require("../network/errors.js");

app.use("/api/post", post);
app.use(errors);

app.listen(postService.port, () => console.log("Post service on: ", `http://localhost:${postService.port}`));
