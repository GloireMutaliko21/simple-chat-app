import Message from "../models/message.mdl.js";
import mongoose from "mongoose";
import userMdl from "../models/user.mdl.js";

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
        }).populate('senderId');
        let friends;
        let messagesTosend;
        if (!messages) {
            res.status(404).json({ message: 'Begin Talk' });
        } else {
            const userIds = [];
            messages.map(message => {
                const idUser = message.talkers.find(id => id.toString() !== senderId.toString());
                userIds.push(idUser);
            });

            try {
                friends = await userMdl.find({
                    _id: { $in: userIds }
                });
                messagesTosend = await Promise.all(
                    friends.map(async (friend) => {
                        const msg = await Message.findOne({
                            talkers: {
                                $all: [senderId, friend._id],
                            }
                        }).sort({ createdAt: -1 }).exec();
                        return msg;
                    })
                )
            } catch (err) {
                console.log(err);
            }
        }
        res.status(200).json({ data: { friends, messages: messagesTosend } });
    } catch (err) {
        res.status(500).json({ err });
    }
};