//Imports
import express from 'express';

import db from './config/db.config.js';
import { racineApiRoute, userPath } from './constants/constants.js';
import userRouter from "./routes/user.routes.js"

const app = express();

//Middlewares
app
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

//Routes
app.use(`${racineApiRoute}${userPath}`, userRouter);



//app listener
try {
    await db;
    app.listen(process.env.PORT || 7000);
    console.log('Connection success');
} catch (err) {
    console.log(err.message);
}