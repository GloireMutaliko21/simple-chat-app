import { body, validationResult } from "express-validator";

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

export const resultsValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        res.status(422).json({ error: errors.array()[0].msg });
        next()
    }
};