import jwt from 'jsonwebtoken';
import userMdl from '../models/user.mdl.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        req.user = await userMdl.findById(userId);
        next();
    } catch (err) {
        res.status(401).json({ err })
    }
};

export default auth;

