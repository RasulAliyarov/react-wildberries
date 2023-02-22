const mongoose = require("mongoose")

const SellstShema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    date: { type: String, default: new Date().toLocaleString("en-US") },
})

const SellsModel = new mongoose.model("Sells", SellstShema)

module.exports = SellsModel