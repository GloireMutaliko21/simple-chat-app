import express from "express";
import { postSendMessage } from "../controllers/messages.ctrll.js";
import auth from '../middlewares/auth.mid.js';

const router = express.Router();

router.post('/send/:receiverId', auth, postSendMessage);

export default router;