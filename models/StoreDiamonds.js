const mongoose = require('mongoose');

const StoreDiamondsSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('storeDiamonds', StoreDiamondsSchema);
