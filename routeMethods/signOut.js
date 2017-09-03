const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("user");

module.exports = (req, res, next) => {
	req.user.removeToken(req.token).then(
		() => {
			res.status(200).send();
		},
		() => {
			res.status(400).send();
		}
	);
};
