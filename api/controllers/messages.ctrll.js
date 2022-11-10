import Message from "../models/message.mdl.js";

export const postSendMessage = async (req, res, next) => {
    const { content } = req.body;
    const senderId = req.user._id;
    const talkers = [senderId, req.params.receiverId];
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