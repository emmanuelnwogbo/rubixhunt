const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("post");

const authenticate = require("../middlewares/authenticate");

module.exports = app => {
	app.get("/posts", authenticate, (req, res, next) => {
		res.send("hello from posts");
	});
};
