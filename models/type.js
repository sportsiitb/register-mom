const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Type", typeSchema);
