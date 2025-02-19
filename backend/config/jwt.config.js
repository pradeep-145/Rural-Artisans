import dotenv from 'dotenv';
dotenv.config();

const config = {
    secret: process.env.JWT_SECRET,
    expiresIn: '30d'
};

export default config;