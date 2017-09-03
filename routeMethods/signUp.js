const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("user");

const signIn = require("./signIn");

module.exports = (req, res, next) => {
	let body = _.pick(req.body, [
		"email",
		"socialId",
		"username",
		"profilePhoto"
	]);

	let socialId = body.socialId;

	User.findOne({ socialId }).then(user => {
		if (user) {
			//remember to simply transfer control to the sign in function
			return next();
		} else {
			let user = new User(body);

			user
				.save()
				.then(() => {
					return user.generateAuthToken();
				})
				.then(token => {
					res.header("x-auth", token).send(user);
				})
				.catch(e => {
					res.status(400).send(e);
				});
		}
	});
};
