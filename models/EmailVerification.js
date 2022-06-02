const mongoose = require("mongoose");

const EmailVerificaionSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("emailVerification", EmailVerificaionSchema);
