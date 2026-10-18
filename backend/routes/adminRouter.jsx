const express = require("express")
const {adminSignup,addProducts,viewAllProducts,updateProduct,handleDelete} = require("../controllers/adminController.jsx")

const upload = require("../middleware/upload.jsx")

const adminrouter = express.Router()

adminrouter.post("/login",adminSignup)
adminrouter.post("/add_products",addProducts) 
adminrouter.get("/all_products",viewAllProducts)
adminrouter.put("/update_product",updateProduct)
adminrouter.delete("/delete_product/:id",handleDelete)


module.exports = adminrouter;









