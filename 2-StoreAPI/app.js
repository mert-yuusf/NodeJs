const express = require('express');
const productRouter = require('./routes/products');
const connectDb = require('./db/connect');
const notFound = require('./middlewares/not-found');

require('dotenv').config();
require('express-async-errors');

const app = express();
app.use(notFound);
app.use(express.json());
app.use('/api/v1', productRouter);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => console.log(`server is running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
