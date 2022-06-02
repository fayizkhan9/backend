const mongoose = require('mongoose');

const DiamondsPerFollow = new mongoose.Schema({
  diamonds: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "diamondsPerFollow"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('diamondsPerFollow', DiamondsPerFollow);
