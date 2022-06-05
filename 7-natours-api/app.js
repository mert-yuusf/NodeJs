const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDb = require("./db/connectDb");
// const {populateTours} = require("./populateData")

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"))

// ROUTERS
const tourRouter = require("./routes/toursRouter");
const authRouter = require("./routes/authRouter")
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1", authRouter);

// CONFIG
const port = process.env.PORT || 5000;
const DB = process.env.MONGO_URI;


const start = async () => {
    try {
        await connectDb(DB);
        // await populateTours();
        app.listen(port, () => console.log("Server is started on port", port));

    } catch (e) {
        console.log(e)
    }
}

start()
