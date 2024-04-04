const userModel = require("../model/User");
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();

    if (!user) {
      return res.status(404).send({ error: "Users not found" });
    }

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send({
      error: e.message,
    });
  }
};

module.exports.signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: "User Already Exists" }); // Changed status code to 400 (Bad Request)
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const user = await userModel.create({ name, email, password : hashedPassword, blogs:[] });

    return res.status(201).send(user); // Use return statement to prevent further execution
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req,res) => {
  const {email, password} = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).send({ error: "Couldn't Find The User By This Email" }); // Changed status code to 400 (Bad Request)
    }
  
     const isPassword = await bcrypt.compare(password,  existingUser.password)

     if(!isPassword) {
      return res.status(404).send({error:"Password Is Incorrect"})
     }

     return res.status(200).send({ message: "Login Successful", user: existingUser });

  } catch (err) {
    console.error("Error Logging user:", err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};


