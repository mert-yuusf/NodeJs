const express = require('express');
const tasks = require('./routes/tasks');
const connectDb = require('./db/connect');
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

require('dotenv').config()

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(notFound);
app.use(errorHandlerMiddleware);
app.use('/api/v1/tasks', tasks);
// routes
app.get('/', (req, res) => {
    res.send('index page');
});

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`server is running on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start()