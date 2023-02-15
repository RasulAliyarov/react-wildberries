const mongoose = require("mongoose")

const ProductShema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    productCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    image: [{ type: String, required: true }],
    desc: { type: String, required: true },
    deleteState: { type: Boolean, default: false },
    color: [{ type: String }]
})

const ProductModel = new mongoose.model("Products", ProductShema)

module.exports = ProductModel