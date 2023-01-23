//Imports
import express from 'express';
import http from "http";
import multer from 'multer'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import db from './config/db.config.js';
import Io from './socket.io.js'
import { racineApiRoute, userPath, messagePath } from './constants/constants.js';
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/messages.routes.js"
import { serverError } from './middlewares/errors.mid.js';

const app = express();

const fileStorage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    const fileExtension = file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
    if (fileExtension) {
        console.log(file.mimetype)
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Middlewares
app
    .use(express.urlencoded({ extended: false }))
    .use(multer({ storage: fileStorage, fileFilter }).single('image'))
    .use(express.json())
    .use('/', express.static(path.join(__dirname, 'public')))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

//Routes
app.use(`${racineApiRoute}${userPath}`, userRouter);
app.use(`${racineApiRoute}${messagePath}`, messageRouter);

//Errors middlewares
app.use(serverError);

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

export default app;