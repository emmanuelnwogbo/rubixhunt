const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("user");

module.exports = (req, res, next) => {
	let token = req.header("x-auth");

	User.findByToken(token)
		.then(user => {
			if (!user) {
				return Promise.reject();
			}

			req.user = user;
			req.token = token;
			next();
		})
		.catch(e => {
			res.status(404).send();
		});
};
