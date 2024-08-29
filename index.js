
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const { app, httpServer } = require("./socket/socket")

require("dotenv").config()

// const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/blogs", require("./routes/blog.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    res.status(404).json({ message: err.message || "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("mongo connnected");
    httpServer.listen(process.env.PORT, console.log("server running"))
})

