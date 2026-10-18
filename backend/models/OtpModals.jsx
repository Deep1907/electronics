const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true     
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now,
        expires : 10 * 60
    }
})

const otpMod = mongoose.model("otp",otpSchema)

module.exports = otpMod;