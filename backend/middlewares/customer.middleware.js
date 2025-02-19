import customerModel from '../models/customer.model.js';
import { verify } from '../utils/jwt.utils.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = verify(token);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await customerModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        if (!res.headersSent) {
            return res.status(400).json({ message: "Invalid Token" });
        }
    }
};  

export { authMiddleware };
