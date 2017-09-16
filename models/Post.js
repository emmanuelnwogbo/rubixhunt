const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema({
	photos: [
		{
			type: Schema.Types.ObjectId,
			ref: "photo"
		}
	],
	postType: String,
	fullname: String,
	title: String,
	location: String,
	/*category: String,// this is a front end thing. Determined by the tags*/
	description: String,
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "tag"
		}
	],
	skills: [
		{
			type: Schema.Types.ObjectId,
			ref: "tag"
		}
	], //treat these skills as tags// //these skills might have to be an array of a mongodb schema
	certification: [
		{
			type: Schema.Types.ObjectId,
			ref: "certification"
		}
	],
	workExperience: [
		{
			type: Schema.Types.ObjectId,
			ref: "workexperience"
		}
	],
	involvedInThisProject: [
		{
			type: Schema.Types.ObjectId,
			ref: "post"
		}
	],
	peopleInterestedInThisProject: [
		{
			type: Schema.Types.ObjectId,
			ref: "user"
		}
	],
	portfolio: [
		{
			type: Schema.Types.ObjectId,
			ref: "portfolio"
		}
	],
	hidden: false,
	dateCreated: String
});

mongoose.model("post", Post);
