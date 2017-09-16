const mongose = require("mongoose");
const { Schema } = mongoose;

const WorkExperience = new Schema({
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "photo"
    }
  ]
	title: String,
  description: String,
});

mongoose.model("workexperience", WorkExperience);
