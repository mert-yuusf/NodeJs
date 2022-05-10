const mongoose = require('mongoose');



const connectionString = 'mongodb://localhost:27017/tasksDb';


const connectDb = (url) => {
    return mongoose.connect(url)
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err));
}

module.exports = connectDb