import { body } from "express-validator";

import userMdl from "../models/user.mdl.js";

export const validators = (field, message, action) => {
    // login validation
    if (action === 'login') {
        if (field === 'email') {
            return body(field, message)
                .isEmail()
                .normalizeEmail();
        } else if (field === 'password') {
            return body(field, message)
                .trim();
        }
    } else if (action === 'signup') {
        if (field === 'email') {
            return body(field, message)
                .isEmail()
                .custom(async (value) => {
                    const user = await userMdl.findOne({ email: value });
                    if (user) {
                        return Promise.reject('Email already taken');
                    }
                })
                .normalizeEmail();
        }

        if (field === 'password') {
            return body(field, message)
                .isLength({ min: 6 })
                .trim();
        }
    }
};