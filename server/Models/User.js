const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    repeatpassword: { type: String},
    email: { type: String, unique: true, required: true },
    fullname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    roles: [
        {
            type: String,
            ref: "Role"
        }
    ]
})

const UserModel = new mongoose.model("Users", UserShema)

module.exports = UserModel