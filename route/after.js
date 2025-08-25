const express = require("express")
const app = express.Router()
const afterSchema = require("../schema/afterSchema")



app.get("/", async (req, res)=>{
    res.send("welcome to after order")
})


app.post("/", async (req, res)=>{
    try{
        const cartpush = afterSchema.create({
            name: req.body.name,
            email: req.body.email,
            after: req.body.after
        })
        res.status(201).json(cartpush); 
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.put("/:email", async (req, res)=>{
    try {
        const result = await afterSchema.updateOne({ email: req.params.email }, {after: req.body.after });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No matching document found or no changes made." });
        }

        res.status(200).json({ message: "Cart updated successfully", result });
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

app.get("/:email", async (req, res)=>{
    try {
        const result = await afterSchema.findOne({ email: req.params.email });
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.delete("/:email", async (req, res)=>{
    try {
        const result = await afterSchema.deleteOne({ email: req.params.email });
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

module.exports = app