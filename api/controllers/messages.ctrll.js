import Message from "../models/message.mdl.js";
import mongoose from "mongoose";

export const postSendMessage = async (req, res, next) => {
    const { content } = req.body;
    const senderId = req.user._id;
    const talkers = [senderId, mongoose.Types.ObjectId(req.params.receiverId)];
    try {
        const message = new Message({
            content,
            senderId,
            talkers
        });
        try {
            await message.save();
            res.status(201).json({ message: 'Message sended' });
        } catch (err) {
            res.status(400).json({ err });
        }
    } catch (err) {
        res.status(500).json({ err });
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
        });
        if (!messages) {
            res.status(404).json({ message: `Begin Talks with @${req.user.email}` });
        }
        res.status(200).json({ data: messages });
    } catch (err) {
        res.status(500).json({ err });
    }
};

export const getRelatedMessages = async (req, res, next) => {
    const senderId = req.user._id;
    try {
        const messages = await Message.find({
            talkers: {
                $all: [senderId, senderId],
            }
        });
        if (!messages) {
            res.status(404).json({ message: 'Begin Talk' });
        } else {
            messages.map(message => {
                const idUser = message.talkers.find(id => id.toString() !== senderId.toString());
                console.log(idUser)
            });
        }
        res.status(200).json({ data: messages });
    } catch (err) {
        res.status(500).json({ err });
    }
};