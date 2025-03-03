const mongoose = require("mongoose");
const user = require("./User")


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required:true
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
