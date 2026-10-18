const jwt = require("jsonwebtoken")
const userModel = require("../models/User.jsx")

const isAuth = async (req,res,next) =>{
    try{
        const authHeaders = req.headers.authorization
        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(400).json({success:false,message:"Token Unauthorised"})
        }
        const token = authHeaders.split(" ")[1]
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)

        const userId = decodeToken.userId
        const user = await userModel.findById(userId)

        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"})
        }

        req.user = user
        next()

    }catch(err){
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports = isAuth;