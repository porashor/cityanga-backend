const mongoose = require("mongoose")

const afterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    after: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model("afterordercityanga", afterSchema)