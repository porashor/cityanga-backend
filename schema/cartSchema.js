const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type:Number,
        required: true
    },
    product: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model("cityangauserCart", cartSchema)