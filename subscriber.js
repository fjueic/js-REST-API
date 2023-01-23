const mongoose = require("mongoose");

const subcriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subcribedTo: {
        type: String,
        required: true,
    },
    subcribeDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Subscribers", subcriberSchema);
