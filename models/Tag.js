const mongose = require("mongoose");
const { Schema } = mongoose;

const Tag = new Schema({
	title: String
});

mongoose.model("tag", Tag);
