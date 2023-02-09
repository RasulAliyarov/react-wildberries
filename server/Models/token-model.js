const mongoose = require("mongoose")

const TokenShema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    refreshToken: {type: String, required: true}
})

const TokenModel = new mongoose.model("Tokens", TokenShema)

module.exports = TokenModel