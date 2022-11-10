import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        content: { type: String, require: true },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            req: true
        },
        talkers: Array
    },
    {
        timestamp: true
    }
);

export default mongoose.model('Message', messageSchema);