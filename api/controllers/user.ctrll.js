import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userMdl from "../models/user.mdl.js";
import cloudinary from "../utils/cloudinary.utl.js";

export const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const image = req.file.path;
        console.log(image);

        if (!image) {
            res.status(422).json({ err: 'File empty !' });
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
            }
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

export const postEditUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const image = req.file.path;
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
        res.status(500).json({ err });
    }
};