import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';

import userMdl from "../models/user.mdl.js";
import cloudinary from "../utils/cloudinary.utl.js";
import IO from "../socket.io.js"

export const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const image = req.file.path;

        //ValidatorsResults
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.array()[0].msg });
            return;
        }

        if (!image) {
            res.status(422).json({ error: 'File empty !' });
        }

        const file = await cloudinary.uploader.upload(image, {
            folder: 'chatProfiles'
        });

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await new userMdl({
            email,
            username,
            password: hashedPwd,
            image: {
                id: file.public_id,
                url: file.secure_url
            },
            isLogged: true
        });

        try {
            await user.save();
            IO.getIO().emit('login');
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
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //ValidatorsResults
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.array()[0].msg });
            return;
        }

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
            user.isLogged = true;
            await user.save();
            IO.getIO().emit('login');
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
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await userMdl.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.isLogged = false;
        await user.save();
        IO.getIO().emit('login');
        res.status(204).json({ message: 'No content' });
    } catch (err) {
        const error = new Error(err);
        res.status(500);
        return next(error);
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
        const error = new Error(err);
        res.status(500);
        return next(error);
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
        const error = new Error(err);
        res.status(500);
        return next(error);

    }
};

export const postEditUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const image = req.file.path;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ error: errors.array()[0].msg });
            return;
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await userMdl.findById(req.user._id);
        user.email = email;
        user.username = username;
        user.password = hashedPwd;

        if (image) {
            const file = await cloudinary.uploader.upload(image, {
                folder: 'chatProfiles'
            });

            user.image = {
                id: file.public_id,
                url: file.secure_url
            };
        }

        await user.save();
        res.status(201).json({
            message: 'Updated',
            user,
            token: jwt.sign(
                { userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '6h' }
            )
        });

    } catch (err) {
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
};