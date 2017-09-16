const mongose = require("mongoose");
const { Schema } = mongoose;

const Portfolio = new Schema({
	photos: [
		{
			type: Schema.Types.ObjectId,
			ref: "photo"
		}
	],
	title: String,
	links: [],
	description: String
});

mongoose.model("portfolio", Portfolio);
