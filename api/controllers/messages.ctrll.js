import mongoose from "mongoose";
import { validationResult } from 'express-validator';

import IO from "../socket.io.js";
import Message from "../models/message.mdl.js";

export const postSendMessage = async (req, res, next) => {
    const { content } = req.body;
    const senderId = req.user._id;
    const receiverId = mongoose.Types.ObjectId(req.params.receiverId)
    const talkers = [senderId, receiverId];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ error: errors.array()[0].msg });
        return;
    }

    try {
        const message = new Message({
            content,
            senderId,
            receiverId,
            talkers
        });
        try {
            await message.save();
            IO.getIO().emit('messages', { key: 'sending', message });
            res.status(201).json({ message });
        } catch (err) {
            res.status(400).json({ err });
        }
    } catch (err) {
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
};

export const getMessages = async (req, res, next) => {
    const senderId = req.user._id;
    const receiverId = mongoose.Types.ObjectId(req.params.receiverId);
    try {
        const messages = await Message.find({
            talkers: {
                $all: [senderId, receiverId],
            }
        }).populate(['receiverId', 'senderId']);
        if (!messages) {
            res.status(404).json({ data: `Begin Talks with @${req.user.email}` });
        }
        res.status(200).json({ data: messages });
    } catch (err) {
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
};

export const getRelatedMessages = async (req, res, next) => {
    const senderId = req.user._id;
    try {
        const messages = await Message.find({
            talkers: {
                $all: [senderId, senderId],
            }
        }).populate('senderId');
        let messagesTosend;
        if (!messages) {
            res.status(404).json({ data: { messages: 'Begin Talk' } });
        } else {
            const userIds = [];
            messages.map(message => {
                const idUser = message.talkers.find(id => id.toString() !== senderId.toString());
                userIds.push(idUser.toString());
            });
            try {
                messagesTosend = await Promise.all(
                    [...new Set(userIds)].map(async (friend) => {
                        const msg = await Message.findOne({
                            talkers: {
                                $all: [senderId, mongoose.Types.ObjectId(friend)],
                            }
                        }).populate(['senderId', 'receiverId']).sort({ createdAt: -1 }).exec();
                        return msg;
                    })
                )
                messagesTosend.sort((oldMsg, recentMsg) => recentMsg.createdAt.getTime() - oldMsg.createdAt.getTime());
            } catch (err) {
                console.log(err);
            }
        }
        res.status(200).json({ data: { messages: messagesTosend } });
    } catch (err) {
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
};