const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('query', QuerySchema);
