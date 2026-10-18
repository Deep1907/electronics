const express = require("express")
const userModel = require("../models/User.jsx")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const productModels = require("../models/Product.jsx")

const addData = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        

        await userData.save()

        res.status(200).json({ success: true, message: "User Registered Successfully" })

    }catch(err){
        console.log(err)
    }
}

const addLogin = async (req,res) =>{
    const {email,password} = req.body

    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(400).json({success:false,message:"User doesnt Exist"})
    }

    if(password !== user.password){
        return res.status(400).json({success:false,message:"Wrong Credentials"})
    }

    const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn : "7d"})
    const username = user.username

    return res.status(200).json({success:true,message:"Login Successful",token,username})
    
} 

const getProducts = async (req,res) =>{
    const productsData = await productModels.find({})
    res.status(200).json({success:true,message:"All Products Fetched Successfully",productsData})
}

module.exports = {addData,addLogin,getProducts};