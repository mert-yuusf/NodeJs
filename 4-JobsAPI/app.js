const express = require('express');
const connectDb = require('./db/connect');
require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./swagger.yaml');


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

// app.use
app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
}));

// register routers
app.get('/', (req, res) => {
    res.send(`
    <h1>Jobs API</h1>
    <p>To see all documentation follow link</p>
    <a href="/docs" >docs</a>
    `)
})
app.use('/docs', swaggerUI.serve,
    swaggerUI.setup(swaggerDocs))
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authorizerUser, jobRouter);


const start = async () => {
    try {
        await connectDb(MONGO_URI);
        app.listen(PORT, () => console.log('server is running on port: ' + PORT));
    } catch (error) {
        console.log(error);
    }

}

start();
