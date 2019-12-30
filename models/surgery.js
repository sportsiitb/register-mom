const mongoose = require("mongoose");

const surgerySchema = mongoose.Schema({
    hName: {
        type: String,
    },
    pName: {
        type: String,
    },
    surgeryType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Surgery", surgerySchema);
