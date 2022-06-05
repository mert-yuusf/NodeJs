// database connect method
const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;
const connectDb = (connectionString) => {
    mongoose.connect(DB).then(conn => {
        console.log("Connect to db")
    }).catch(error => console.log(error));
}

module.exports = connectDb;
