import jwt from 'jsonwebtoken';
import config from '../config/jwt.config.js';

const generateToken = (payload) => {
    return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
};

const verify = (token) => {
    return jwt.verify(token, config.secret);
};

export { generateToken, verify };
