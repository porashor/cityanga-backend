const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../schema/usersSchema");

app.get("/", (req, res) => {
  res.send("welcome to create users ");
});

app.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const data = {
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    password: hashedPassword,
    role: "user",
  };
  try {
    const userCreate = await userModel.create(data);
    res.json(userCreate);
  } catch (err) {
    console.log(err);
    res.status(500).json("no data found");
  }
});

app.post("/:id", async (req, res) => {
  try {
    const userLocationAddress = await userModel.updateOne(
      {email: req.params.id },{ location: req.body.location }
    );
    res.json(userLocationAddress);
  } catch (err) {
    console.log(err);
    res.status(500).json("cannot update location");
  }
});

module.exports = app;
