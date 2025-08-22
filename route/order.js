const express = require("express")
const app = express.Router()
const orderSchema = require("../schema/orderSchema")



app.get("/", async (req, res)=>{
    res.send("welcome to place order here")
})


app.post("/", async (req, res)=>{
    try{
        const cartpush = orderSchema.create({
            name: req.body.name,
            email: req.body.email,
            price: req.body.price,
            delivery: req.body.delivery,
            product: req.body.product
        })
        res.status(201).json(cartpush); 
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.put("/:email", async (req, res)=>{
    const data = {
        price: req.body.price,
        product: req.body.product
    }
    try {
        const result = await orderSchema.updateOne({ email: req.params.email }, data);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No matching document found or no changes made." });
        }

        res.status(200).json({ message: "order updated successfully", result });
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.get("/:email", async (req, res)=>{
    try {
        const result = await orderSchema.findOne({ email: req.params.email });
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.delete("/:email", async (req, res)=>{
    try {
        const result = await orderSchema.deleteOne({ email: req.params.email });
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

module.exports = app