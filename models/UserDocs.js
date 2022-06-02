const mongoose = require("mongoose");

const UserDocsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userDocs", UserDocsSchema);
