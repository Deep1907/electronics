const mongoose = require("mongoose")

const OtpPasswordSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now,
        expired : 10 * 60
    }
})

const OtpForgotPasswordModel = mongoose.model("otp-forgot",OtpPasswordSchema)

module.exports = OtpForgotPasswordModel;