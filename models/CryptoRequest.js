const mongoose = require('mongoose');

const CryptoRequest = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    diamonds: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    requestType: {
        type: String,
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

module.exports = mongoose.model('crpyptoRequests', CryptoRequest);
