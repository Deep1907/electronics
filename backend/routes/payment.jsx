const express = require("express");
const isAuth = require("../middleware/isAuth.jsx");
const instance = require("../helper/razorpay.jsx")
const paymentModel = require("../models/PaymentSchema.jsx")

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

module.exports = paymentRouter;