const express = require("express")
const {sendOtp,verifyOtp,sendForgetOtp,verifyPasswordOtp,changePassword} = require("../controllers/sendOtp.jsx")


const otprouter = express.Router()

otprouter.post("/otp",sendOtp)
otprouter.post("/verifyOtp",verifyOtp)
otprouter.post("/forget-password",sendForgetOtp)
otprouter.post("/verify-forgot-password-otp",verifyPasswordOtp)
otprouter.post("/change-password",changePassword)


module.exports = otprouter;