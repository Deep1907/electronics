const express = require("express");
const isAuth = require("../middleware/isAuth.jsx");
const instance = require("../helper/razorpay.jsx")
const paymentModel = require("../models/PaymentSchema.jsx")
const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils.js")

const paymentRouter = express.Router()

paymentRouter.post("/create", isAuth , async (req,res)=>{

    try{
        const {total} = req.body
        const totalAmt = Math.round(Number(total) * 100);
        const order = await instance.orders.create({
           "amount" : totalAmt,
           "currency" : "INR",
           "receipt" : "receipt #1",
           "notes" : {
                "username" : req.user.username
           } 
        })

        console.log(order)

        const payment = new paymentModel({
            userId : req.user._id,
            orderId : order.id,
            status : order.status,
            amount : order.amount,
            currency : order.currency,
            receipt : order.receipt,
            notes : order.notes
        })

        const savedPayment = await payment.save()

        return res.json({...savedPayment.toJSON(),keyId:process.env.RAZORPAY_KEY_ID})


    }catch (err) {
    console.error("Creating order error:", err);

    return res.status(500).json({
        message: "Failed to create payment order"
    });
}

})

paymentRouter.post("/webhook",async (req,res)=>{
    try{
        const webhookSignature = req.headers("X-Razorpay-Signature")
        const isWebhookValid = validateWebhookSignature(JSON.Stringify(req.body),webhookSignature,process.env.WEBHOOK_SECRET)
        if(!isWebhookValid){
            res.status(400).json({success:false,message:"Webhook not valid"})
        }

        const paymentDetails = req.body.payload.payment.entity
        const payment = await paymentModel.findOne({orderId : paymentDetails.order_id})
        payment.status = paymentDetails.status
        await payment.save()


        return res.status(200).json({success:true,message:"Webhook Received Successfully"})
    }catch(err){
        console.log(err)
    }
})

paymentRouter.get("/verify", isAuth, async (req,res)=>{
    const user = req.user
    if(user){
        return res.status(200).json({success:true,message:"Verified Successfully"})
    }
})


module.exports = paymentRouter;