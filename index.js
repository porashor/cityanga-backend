const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();

const app = express()
app.use(express.json())

//mongoose setup
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log(err)
    })

//router getting start
const product = require("./route/product")
//router getting end


app.get("/", (req, res)=>{
    res.send("welcome")
})

//app using start
app.use("/product", product)
//app using end

app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})