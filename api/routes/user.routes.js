import express from "express";

import { findAllUsers, findOneUser, login, logout, postEditUser, signup } from '../controllers/user.ctrll.js';
import auth from '../middlewares/auth.mid.js';

const router = express.Router();

router
    .post('/signup', signup)

    .post('/login', login)

    .get('/logout', auth, logout)

    .get('/', auth, findAllUsers)

    .get('/:id', auth, findOneUser)

    .put('/edit', auth, postEditUser);

export default router;