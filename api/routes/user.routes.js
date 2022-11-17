import express from "express";

import { findAllUsers, findOneUser, login, postEditUser, signup } from '../controllers/user.ctrll.js';
import auth from '../middlewares/auth.mid.js';

const router = express.Router();

router
    .post('/signup', signup)

    .post('/login', login)

    .get('/', auth, findAllUsers)

    .get('/:id', auth, findOneUser)

    .put('/edit/:id', auth, postEditUser);

export default router;