const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
  title: {
    type: String,
    required: true,
  }, author: String,
  source: String,
  text: [{
    type: String,
    required: true,
  }], link: String,
  tags: [{type: String, lowercase: true}],
  pubYear: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);