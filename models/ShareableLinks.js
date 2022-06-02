const mongoose = require("mongoose");

const ShareableLinks = new mongoose.Schema({
  links: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("shareableLinks", ShareableLinks);
