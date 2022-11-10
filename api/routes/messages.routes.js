import express from "express";
import { getMessages, postSendMessage } from "../controllers/messages.ctrll.js";
import auth from '../middlewares/auth.mid.js';

const router = express.Router();

router
    .post('/send/:receiverId', auth, postSendMessage)

    .get('/messages/:receiverId', auth, getMessages);

export default router;