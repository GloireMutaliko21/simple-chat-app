import express from "express";

import { findAllUsers, login, signup } from '../controllers/user.ctrll.js';

const router = express.Router();

router
    .post('/signup', signup)

    .get('/login', login)

    .get('/', findAllUsers);

export default router;