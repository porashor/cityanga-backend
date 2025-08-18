const express = require("express")
const app = express.Router()
const userModel = require("../schema/usersSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



app.get("/", (req, res)=>{
    res.send("welcome to login users ")
})


app.post("/", async (req, res)=>{
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    try{
        const userCreate = await userModel.findOne({email: req.body.email})
        const isMatch = await bcrypt.compare(req.body.password, userCreate.password)
        if(!isMatch){
            res.status(500).json("no data found")
        }else{
            const token = jwt.sign({
                name: userCreate.name,
                email: userCreate.email,
                role: userCreate.role
            }, process.env.JWT_TOKEN_SEC, {
                expiresIn: "7d"
            })
            res.json({data: userCreate, token})
        }
    }catch(err){
        console.log(err)
        res.status(500).json("no data found")
    }
})

module.exports = app