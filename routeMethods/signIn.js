const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("user");

module.exports = (req, res, next) => {
	let body = _.pick(req.body, ["socialId"]);

	let socialId = body.socialId;

	User.findOne({ socialId }).then(user => {
		if (!user) {
			return next();
		}

		User.findByCredentials(socialId)
			.then(user => {
				return user.generateAuthToken().then(token => {
					res.header("x-auth", token).send(user);
				});
			})
			.catch(e => {
				res.status(400).send();
			});
	});
};
