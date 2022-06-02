const mongoose = require('mongoose');

const WithdrawRequest = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cryptoAddress: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('withdrawRequest', WithdrawRequest);
