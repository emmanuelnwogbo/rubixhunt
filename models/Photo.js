const mongose = require("mongoose");
const { Schema } = mongoose;

const Photo = new Schema({
	baseUrl: String
});

mongoose.model("photo", Photo);
