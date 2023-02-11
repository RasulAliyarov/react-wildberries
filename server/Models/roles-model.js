const mongoose = require("mongoose")

const RoleShema = new mongoose.Schema({
    value: {type: String, unique: true, default: "USER"}
})

const RoleModel = new mongoose.model("Roles", RoleShema)

module.exports = RoleModel