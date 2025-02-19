import jwt from 'jsonwebtoken'

const generateToken=async(payload)=>{
    const token=await jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const verifyToken=async(token)=>{
    const decoded=await jwt.verify(token, process.env.JWT_SECRET)
    return decoded;
}

export default {generateToken, verifyToken};