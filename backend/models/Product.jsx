const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    product : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    }
}) 

const productModels = mongoose.model("products",productSchema)

module.exports = productModels;