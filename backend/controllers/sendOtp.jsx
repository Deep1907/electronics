const userModel = require("../models/User.jsx")
const otpGenerator = require("otp-generator")
const sendEmail = require("../helper/sendEmail.jsx")
const otpMod = require("../models/OtpModals.jsx")
const OtpForgotPasswordModel = require("../models/OtpForgotPassword.jsx")

const sendOtp = async (req,res) =>{
    try{

        const {username,email,password} = req.body

        if(!email){
            return res.status(400).json({
                success : false,
                message : "Provide Email"
            })
        }

        const user = await userModel.findOne({ email })
        if(user){
            return res.status(400).json({
                success : false,
                message : "Already Registered"
            })
        }

        const otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
            digits : true
        })


        try{
            await sendEmail(email,"Otp Verification",otp)
        }catch(err){
            console.log(err)
        }

        await otpMod.create({username,email,password,otp})

        return res.status(200).json({
            success : true,
            message : "Otp Sent Successfully"
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}


const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;

        if (!otp || !email) {
            return res.status(400).json({
                success: false,
                message: "OTP and email are required"
            });
        }

        const userOtp = await otpMod.findOne({ email });

        if (!userOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired"
            });
        }

        if (userOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "OTP Wrong"
            });
        }

        // OTP is correct, now create the user
        await userModel.create({
            username: userOtp.username,
            email: userOtp.email,
            password: userOtp.password
        });

        // Delete the OTP record
        await otpMod.deleteOne({
            _id: userOtp._id
        });

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const sendForgetOtp = async (req,res) =>{
    const {email} = req.body

    if(!email){
        return res.status(400).json({success:false,message:"Need Registered Email"})
    }

    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(400).json({success:false,message:"User Not Registered, Please Register"})
    }

    const otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
            digits : true
    })

    try{

        await sendEmail(email,"Forgot Password Otp Link",otp)
        await OtpForgotPasswordModel.create({email,otp})
        return res.status(200).json({success:true,message:"Otp Sent Successfully"})

    }catch(err){
        return res.status(500).json({success:false,message:"Error in Sending Otp"})
    }


}

const verifyPasswordOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const userOtp = await OtpForgotPasswordModel.findOne({ email });

        if (!userOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired"
            });
        }

        if (String(otp) !== String(userOtp.otp)) {
            return res.status(400).json({
                success: false,
                message: "Wrong OTP"
            });
        }

        // OTP is correct
        await OtpForgotPasswordModel.deleteOne({
            _id: userOtp._id
        });

        return res.status(200).json({
            success: true,
            message: "OTP matched successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const changePassword = async (req,res) =>{
    const {email,pass,confirmPass} = req.body

    if(pass !== confirmPass){
        return res.status(400).json({success:false,message:"Both Passwords are different"})
    }

    const user = await userModel.findOneAndUpdate({email:email},{password:pass},{new:true})

    if(!user){
        return res.status(400).json({success:false,message:"User Not Found"})
    }

    return res.status(200).json({success:true,message:"Password Updated Successfully"})


}




module.exports = {sendOtp,verifyOtp,sendForgetOtp,verifyPasswordOtp,changePassword};