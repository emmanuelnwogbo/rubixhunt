const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema({
	fullname: String,
	title: String,
	location: String,
	description: String,
	skills: String,
	education: String,
	workExperience: String,
	involvedInThisProject: [
		{
			type: Schema.Types.ObjectId,
			ref: "post"
		}
	],
	interests: {
		type: Number,
		default: 0
	},
	dateCreated: String
});

mongoose.model("post", Post);
