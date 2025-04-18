const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String, // file path will be stored here
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
