import express from "express";

import { getMessages, getRelatedMessages, postSendMessage } from "../controllers/messages.ctrll.js";
import auth from '../middlewares/auth.mid.js';
import { validators } from '../middlewares/validators.mid.js';

const router = express.Router();

router
    .post(
        '/send/:receiverId',
        validators('content', 'Enter a valid message', 'sendMsg'),
        auth,
        postSendMessage
    )

    .get('/messages', auth, getRelatedMessages)

    .get('/messages/:receiverId', auth, getMessages);


export default router;