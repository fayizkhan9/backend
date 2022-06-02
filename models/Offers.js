const mongoose = require("mongoose");

const OffersSchema = new mongoose.Schema(
    {
        diamonds: {
            type: String,
        },
        followers: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("offers", OffersSchema);
