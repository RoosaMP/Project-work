const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  context: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;