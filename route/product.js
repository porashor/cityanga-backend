const express = require("express")
const mongoose = require("mongoose")
const app = express.Router()

app.get("/", async (req, res)=>{
    try{
        const collection = mongoose.connection.db.collection("cproduct")
        const data = await collection.find({}).toArray()
        res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

app.get("/:id", async (req, res)=>{
    try{
        const collection = mongoose.connection.db.collection("cproduct")
        const data = await collection.findOne({ _id: new mongoose.Types.ObjectId(req.params.id)})
        res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})



module.exports = app