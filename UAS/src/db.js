const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/video", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.error("MongoDB connection error: " + e.message);
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LogInCollection = new mongoose.model("LogInCollection", logInSchema);

module.exports = LogInCollection;