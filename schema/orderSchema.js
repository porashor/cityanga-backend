const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type:Number,
        required: true
    },
    delivery: {
        type:Number,
        required: true
    },
    product: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("cityangauserOrder", orderSchema)