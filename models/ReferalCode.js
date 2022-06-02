const mongoose = require("mongoose");

const ReferalCode = new mongoose.Schema({
  userFrom: {
    type: String,
    required: true,
  },
  userTo: {
    type: String,
    default: ''
  },
  referalCode: {
    type: String,
    required: true
  },
  referalCodeStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("referalCode", ReferalCode);
