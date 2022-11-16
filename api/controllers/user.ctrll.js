import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userMdl from "../models/user.mdl.js";

export const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await new userMdl({
            email,
            username,
            password: hashedPwd
        });
        try {
            await user.save();
            res.status(201).json({
                message: 'Registered',
                user,
                token: jwt.sign(
                    { userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '6h' }
                )
            });
        } catch (err) {
            res.status(400).json({ err });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userMdl.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid authentication params 1' });
            return;
        }
        try {
            const isValidPwd = await bcrypt.compare(password, user.password);
            if (!isValidPwd) {
                res.status(401).json({ error: 'Invalid authentication params 2' });
                return;
            }
            res.status(200).json({
                user,
                token: jwt.sign(
                    { userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '6h' }
                )
            });
        } catch (err) {
            res.status(401).json({ err });
        }
    } catch (err) {
        res.status(500).json({ err });
    }
};

export const findAllUsers = async (req, res, next) => {
    try {
        const users = await userMdl.find();
        if (!users) {
            res.status(404).json({ error: 'Users not found' });
        }
        res.status(200).json({ message: 'Users founded', data: users });
    } catch (err) {
        res.status(404).json({ err });
    }
};

export const findOneUser = async (req, res, next) => {
    try {
        const user = await userMdl.findById(req.params.id)
        if (!user) {
            res.status(400).json({ error: 'No User founded' });
        }
        res.status(200).json({ message: 'User founded', data: user })
    } catch (err) {
        res.status(404).json({ err });

    }
};