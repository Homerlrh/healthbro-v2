const mongoose = require("mongoose");

// user document representation
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  favourite: [String],
});

mongoose.model("User", userSchema);

module.exports = mongoose.model("User");
