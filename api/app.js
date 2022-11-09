//Imports
import express from 'express';

import db from './config/db.config.js';

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get('/', (req, res, next) => {
    const data = { ...req.body }
    res.json({ message: 'Server received your GET request', data });
});



//app listener
try {
    await db;
    app.listen(process.env.PORT || 7000);
    console.log('Connection success');
} catch (err) {
    console.log(err.message);
}