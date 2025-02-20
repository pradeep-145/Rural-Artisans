import { verify } from '../utils/jwt.utils.js';

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = verify(token);
        if (!decoded || decoded.username !== process.env.username) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = { username: process.env.username };
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        if (!res.headersSent) {
            return res.status(400).json({ message: "Invalid Token" });
        }
    }
};  

export { adminAuthMiddleware };

