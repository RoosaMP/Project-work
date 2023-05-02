const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  context: String,
  post_date: {
    type: Date,
    default: Date.now
  },
  img: {
    data: Buffer,
    contentType: String
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;