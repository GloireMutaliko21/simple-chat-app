import bcrypt from "bcrypt";
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

        if (field === 'username') {
            return body(field, message)
                .isString()
                .trim()
                .isLength({ min: 4 });
        }
    } else if (action === 'sendMsg') {
        return body(field, message)
            .trim()
            .isLength({ min: 1 })
    } else if (action === 'editProfile') {
        if (field === 'email') {
            return body(field, message)
                .isEmail().
                custom(async (value, { req }) => {
                    if (req.user.email !== value) {
                        const user = await userMdl.findOne({ email: value });
                        if (user) {
                            return Promise.reject('Email already taken');
                        }
                    }
                })
                .normalizeEmail();
        }
        if (field === 'oldPwd') {
            return body(field, message)
                .isLength({ min: 6 })
                .trim()
                .custom(async (value, { req }) => {
                    const user = await userMdl.findOne({ email: req.user.email });
                    const isValidPwd = await bcrypt.compare(value, user.password);
                    if (!isValidPwd) {
                        return Promise.reject('Wrong password');
                    }
                })
        }
    }
};