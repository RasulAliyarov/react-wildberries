const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    fullname: { type: String, required: true },
    phonenumber: { type: String },
    activated: { type: Boolean, default: false },
    activationLink: { type: String },
    postIndex: { type: String },
    country: { type: String },
    bankCard: { type: String },
    deleteState: { type: Boolean, default: false },
    roles: [{ type: String, ref: "Roles" }],
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }]
})

const UserModel = new mongoose.model("Users", UserShema)

module.exports = UserModel