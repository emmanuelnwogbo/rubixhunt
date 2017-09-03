const signUp = require("../routeMethods/signUp");
const signIn = require("../routeMethods/signIn");
const signOut = require("../routeMethods/signOut");

const authenticate = require("../middlewares/authenticate");

module.exports = app => {
	app.post("/api/auth/user/signup", signUp, signIn);

	app.delete("/api/auth/user/signout", authenticate, signOut);
};
