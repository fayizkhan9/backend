const mongoose = require('mongoose');

const HashTagsSchema = new mongoose.Schema({
  tags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('hashTags', HashTagsSchema);
