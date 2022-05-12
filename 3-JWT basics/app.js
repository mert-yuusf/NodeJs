const express = require('express');
const connectDb = require('./db/connect');
const mainRouter = require('./routes/main');
const errorHandler = require('./middlewares/error-handler');

require('express-async-errors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use('/api/v1', mainRouter)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => console.log('server is running on ', port));
    } catch (error) {
        console.log(error);
    }
}

start();