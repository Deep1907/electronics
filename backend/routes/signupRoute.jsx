const express = require("express")
const {addData,addLogin,getProducts} = require("../controllers/signupControllers.jsx")

const router = express.Router()

router.post("/addSignupData",addData)
router.post("/loginData",addLogin)
router.get("/products",getProducts)

module.exports = router;