import express from "express";

import { findAllUsers, findOneUser, login, logout, postEditUser, signup } from '../controllers/user.ctrll.js';
import auth from '../middlewares/auth.mid.js';
import { validators } from '../middlewares/validators.mid.js';

const router = express.Router();

router
    .post(
        '/signup',
        [
            validators('email', 'Please enter a valid e-mail', 'signup'),
            validators('password', 'Password must have 6 characters or more', 'signup'),
            validators('username', 'Please enter a username of 4 characters or more', 'signup')
        ],
        signup
    )

    .post(
        '/login',
        [
            validators('email', 'Please enter a valid e-mail', 'login'),
            validators('password', '', 'login')
        ],
        login
    )

    .get('/logout', auth, logout)

    .get('/', auth, findAllUsers)

    .get('/:id', auth, findOneUser)

    .put(
        '/edit',
        auth,
        [
            validators('email', 'Enter a valid e-mail', 'editProfile'),
            validators('oldPwd', '', 'editProfile')
        ],
        postEditUser
    );

export default router;