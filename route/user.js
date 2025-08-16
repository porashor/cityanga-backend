const express = require("express")
const app = express.Router()
const bcrypt = require('bcrypt');
const userModel = require("../schema/usersSchema")

app.post("/", async (req, res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: "user"
    }
    try{
        const userCreate = await userModel.create(data)
        res.json(userCreate)
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

module.exports = app