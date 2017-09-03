const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const keys = require("../config/keys");

const { Schema } = mongoose;

const User = new Schema({
	socialId: String,
	username: String,
	profilePhoto: String,
	email: {
		type: String,
		required: true
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: "post"
		}
	],
	bookMarks: [
		{
			type: Schema.Types.ObjectId,
			ref: "post"
		}
	],
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

User.methods.generateAuthToken = function() {
	let user = this;
	let access = "auth";
	let token = jwt
		.sign(
			{
				_id: user._id.toHexString(),
				access
			},
			keys.JWT_SECRET
		)
		.toString();

	user.tokens.push({ access, token });

	return user.save().then(() => {
		return token;
	});
};

User.methods.removeToken = function(token) {
	let user = this;

	return user.update({
		$pull: {
			tokens: { token }
		}
	});
};

User.statics.findByToken = function(token) {
	let User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, keys.JWT_SECRET);
	} catch (e) {
		/*return new Promise((resolve, reject) => {
      reject();
    });*/
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		"tokens.token": token,
		"tokens.access": "auth"
	});
};

User.statics.findByCredentials = function(socialId) {
	let User = this;

	return User.findOne({ socialId }).then(user => {
		if (!user) {
			return Promise.reject();
		}

		return Promise.resolve(user);
	});
};

mongoose.model("user", User);
