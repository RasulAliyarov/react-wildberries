const mongoose = require("mongoose")

const CategoryShema = new mongoose.Schema({
    categoryName: { type: String, unique: true, required: true, default: false },
    categoryImage: { type: String, required: false, default: false },
    deleteState: { type: Boolean, default: false },
})

const CategoryModel = new mongoose.model("Categories", CategoryShema)

module.exports = CategoryModel