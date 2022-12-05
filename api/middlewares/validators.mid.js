import { body } from "express-validator";

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
    }
};