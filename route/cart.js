const express = require("express")
const app = express.Router()
const cartSchema = require("../schema/cartSchema")



app.get("/", async (req, res)=>{
    res.send("welcome to put product on cart")
})


app.post("/", async (req, res)=>{
    try{
        const cartpush = cartSchema.create({
            name: req.body.name,
            email: req.body.email,
            price: req.body.price,
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
        const result = await cartSchema.updateOne({ email: req.params.email }, data);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No matching document found or no changes made." });
        }

        res.status(200).json({ message: "Cart updated successfully", result });
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.get("/:email", async (req, res)=>{
    try {
        const result = await cartSchema.findOne({ email: req.params.email });
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.delete("/:email", async (req, res)=>{
    try {
        const result = await cartSchema.deleteOne({ email: req.params.email });
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

module.exports = app