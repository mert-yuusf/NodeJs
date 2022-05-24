require("dotenv").config();
require("express-async-errors");
// express
const express = require('express');
const app = express();

// rest of packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// database
const connectDb = require('./db/connect');

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
// basic routes
app.get('/', (req, res) => {
    console.log(req.signedCookies);
    res.send('e-commerce api')
});

const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);




const port = process.env.PORT || 5000;

const start = async () => {
    try {
        connectDb(process.env.MONGO_URI);
        app.listen(port, () => console.log('app started on port', port))
    } catch (error) {
        console.log(error);
    }
}

start();