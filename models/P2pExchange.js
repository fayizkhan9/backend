const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  reciever: {
    type: String,
    required: true
  },
  diamondsCount: {
    type: Number,
    required: true,
  },
  cryptoAddress: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true
  },
  type: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Exchange", ExchangeSchema);
