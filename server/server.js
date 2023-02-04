require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 8080
const { USERNAME, PASSWORD } = require("./Config/configDB")
const router = require("./Routes/routes")

app.use(express.json())
app.use(cors())
app.use("/auth", router)


const start = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wrinoe0.mongodb.net/?retryWrites=true&w=majority`)
            .then(console.log("Connect to MongoDB"))
            .catch(error =>
                console.log(error)
            )

        app.listen(PORT, () => {
            console.log(`Server is up ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()
