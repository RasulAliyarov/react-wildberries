require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 8080
const router = require("./Routes/routes")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./Middleware/error-middleware")

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');
});
app.use(express.json({limit: '10mb'}))
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(cookieParser())
app.use("/api", router)
app.use(errorMiddleware)


const start = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(process.env.DB_URL)
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
