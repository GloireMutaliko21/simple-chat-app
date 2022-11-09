import express from "express";

import { login, signup } from '../controllers/user.ctrll.js';

const router = express.Router();

router
    .post('/signup', signup)

    .get('/login', login);

export default router;