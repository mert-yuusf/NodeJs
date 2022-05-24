const mongoose = require("mongoose");


const connectDb = (connectionString) => {
    return mongoose.connect(connectionString)
        .then(() => console.log('connected to database'))
        .catch((error) => console.log(error));
}


module.exports = connectDb;