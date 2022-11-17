//Imports
import express from 'express';
import http from "http";
import multer from 'multer'
// import { Server } from "socket.io";

import db from './config/db.config.js';
import Io from './socket.io.js'
import { racineApiRoute, userPath, messagePath } from './constants/constants.js';
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/messages.routes.js"

const app = express();

//Middlewares
app
    .use(multer().single('image'))
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
app.use(`${racineApiRoute}${messagePath}`, messageRouter);



//app listener
try {
    await db;
    const server = http.createServer(app).listen(process.env.PORT || 7000);
    const io = Io.init(server);
    io.on('connection', client => {
        console.log('A new client was connected');
    });
    console.log('DB connection success');

} catch (err) {
    console.log(err.message);
}