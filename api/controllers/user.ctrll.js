import bcrypt from "bcrypt";


import userMdl from "../models/user.mdl.js";

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await new userMdl({
            email,
            password: hashedPwd
        });
        try {
            await user.save();
            res.status(201).json({ message: 'Registered' });
        } catch (err) {
            res.status(400).json({ err });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};