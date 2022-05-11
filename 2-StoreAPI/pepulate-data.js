const jsonProducts = require('./data.json');
const connectDb = require('./db/connect');
const Product = require('./models/Product');
require('dotenv').config()

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Done');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

start();