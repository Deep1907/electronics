const productModels = require("../models/Product.jsx")

const adminSignup = async (req, res) => {
    try {
        const { adminEmail, adminPassword } = req.body

        if (adminEmail !== process.env.ADMIN_EMAIL || adminPassword !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        return res.status(200).json({ success: true, message: "Admin Logged In" })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const addProducts = async (req, res) => {

    try {
        const { product, price } = req.body
        await productModels.create({
            product: product,
            price: price,
        })

        return res.status(201).json({ success: true, message: "Products Added Successfully" })

    } catch (err) {
        return res.status(500).json({ success: false, message: "server Error" })
    }

}

const viewAllProducts = async (req,res) =>{
    const allProducts = await productModels.find({})
    return res.status(200).json({ success: true, message : "All Products Fetched Successfully",allProducts})
} 

const updateProduct = async (req,res) =>{

    const {product,price,updateProductId} = req.body

    const prod = await productModels.findByIdAndUpdate(updateProductId,{product,price},{ new: true })

    return res.status(200).json({success:true,message:"Updated Successfully",prod})

}

const handleDelete = async (req,res) =>{
    const {id} = req.params
    await productModels.findByIdAndDelete(id)
    return res.status(200).json({success:true,message:"Product Deleted"})
}






module.exports = { adminSignup, addProducts, viewAllProducts,updateProduct,handleDelete };