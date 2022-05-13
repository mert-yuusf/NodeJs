const express = require('express');
const connectDb = require('./db/connect');
require('dotenv').config();
require('express-async-errors');


const app = express();
// app config
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// error handler and middleware
// const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authorizerUser = require('./middleware/authorizer')

// routers
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const profileRouter = require('./routes/profiles');

// app.use
app.use(express.json());
// app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// register routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authorizerUser, jobRouter);
app.use('/api/v1/profiles', authorizerUser, profileRouter);


const start = async () => {
    try {
        await connectDb(MONGO_URI);
        app.listen(PORT, () => console.log('server is running on port: ' + PORT));
    } catch (error) {
        console.log(error);
    }

}

start();
