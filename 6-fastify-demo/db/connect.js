const mongoose = require('mongoose');


const connectionString = "mongodb://localhost:27017/blogDb";


const connectDb = async (url) => {
    return mongoose.connect(connectionString)
        .then(() => console.log('Connected to database..'))
        .catch((error) => console.log(error));
}


module.exports = connectDb;