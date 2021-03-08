const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
  title: String,
  author: String,
  source: String,
  text: String,
  link: String,
  pubYear: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);