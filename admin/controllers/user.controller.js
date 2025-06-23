const express = require("express");
const User = require("../models/user.model.js")
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//function to create jsonwebtoken



const registerUser = async(req,res)=>{
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is missing or empty." });
        }
        const {name,email,password}=req.body;
    
        //checking email is already in use or not
        const exists = await User.findOne({email}) 
        if(exists){
            return res.json({success:false,message:"This email already exists"})
        }
    
        //checker for email format and strong password :)
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"The email is not in valid format"})
    
        }
        if(password.length<8){
            return res.json({success:false,message:"The password is less than 8 characters long"});
    
        }
    
        //hasing User Password
    
        const salt= await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
    
        const newUser = new User({
            name,
            email,
            password:hashedpassword
        })
        //creating new user
        const user= await newUser.save()
        //generating token
        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SIGN);

        res.cookie("uid", token, { 
            httpOnly: true,   // Prevents client-side access
            secure: false,    // Set to true in production (requires HTTPS)
             // Prevents CSRF attacks
        })
    
        res.json({success:true,message:"User has been created"})
    } catch (error) {
        res.json({message:error.message});
    }
    

}

const loginUser=async(req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is missing or empty." });
    }
    const {email,password}=req.body;
   
    const user = await User.findOne({email});
    if(!user){
        return res.json({success:false,message:"user doesnot exists"})

    }
    const match = await bcrypt.compare(password,user.password);
    if(match){
    const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SIGN);
    res.cookie("uid", token, { httpOnly: true, secure: false, sameSite: "strict" });

        res.json({success:true,message:"User has been logged In"})

    }
    else{
        return res.json({success:false,message:"The password is wronng"});
    }
    

}
const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(
                { email, password , role: "admin" }, 
                process.env.JWT_SIGN
            );            res.cookie("uid", token, { 
                httpOnly: true,   // Prevents client-side access
                secure: false,    // Set to true in production (requires HTTPS)
                 // Prevents CSRF attacks
            })
            return res.json({ success: true, message: "Login successful" });

        }
        else{
            return res.status(400).json({  message: "Wrong email and passsword" });;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({  message: "Internal Server Error" });
        
    }

}

module.exports={registerUser,loginUser,loginAdmin}