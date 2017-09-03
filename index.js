const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const keys = require("./config/keys");

require("./models/User");
require("./models/Post");

mongoose.connect(keys.mongoURI, () => {
	console.log(`connected to ${keys.mongoURI}`);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

require("./routes/authRoutes")(app);
require("./routes/addPost")(app);

const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});
