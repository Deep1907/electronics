require("dotenv").config()

const express = require("express")
const cors = require("cors")
const router = require("./routes/signupRoute.jsx")
const otprouter = require("./routes/otpRoute.jsx")
const connectDb = require("./db/connectDb.jsx")

const adminrouter = require("./routes/adminRouter.jsx")
const paymentRouter = require("./routes/payment.jsx")


const app = express()


// middleware
app.use(express.json())
app.use(cors())

connectDb()

app.use("/api/signup",router)
app.use("/api/login",router)
app.use("/api/getData",router)
app.use("/api",otprouter)
app.use("/api/admin",adminrouter)
app.use("/api/payment",paymentRouter)


app.use("/",(req,res)=>{
    return res.send("Done")
})


app.listen(8000,()=>{
    console.log("Server is Running")
})