const mongoose = require('mongoose');

const connectDb = async (url) => {
    await mongoose.connect(url)
        .then(() => console.log('connected to database'))
        .catch((error) => console.log(error));
}

module.exports = connectDb;