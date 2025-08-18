const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

const app = express()
app.use(express.json())

//core uses 
app.use(cors({
    origin: "*",
    credentials: true
}))

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
const category = require("./route/category")
const user = require("./route/user")
const logUser = require("./route/logUser")
//router getting end


app.get("/", (req, res)=>{
    res.send("welcome")
})

//app using start
app.use("/product", product)
app.use("/category", category)
app.use("/user", user)
app.use("/loguser", logUser)
//app using end

app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})