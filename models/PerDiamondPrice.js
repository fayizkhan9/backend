const mongoose = require('mongoose');

const PerDiamondPrice = new mongoose.Schema({
  price: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('perDiamondPrice', PerDiamondPrice);
