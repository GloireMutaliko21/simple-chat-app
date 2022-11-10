import express from "express";

import { findAllUsers, findOneUser, login, signup } from '../controllers/user.ctrll.js';

const router = express.Router();

router
    .post('/signup', signup)

    .post('/login', login)

    .get('/', findAllUsers)

    .get('/:id', findOneUser);

export default router;