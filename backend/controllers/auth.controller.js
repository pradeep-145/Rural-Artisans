import bcrypt from 'bcryptjs'
import artisanModel from '../models/artisan.model.js'
import customerModel from "../models/customer.model.js"
import { generateToken } from '../utils/jwt.utils.js'
export const artisanSignUp = async (req, res) => {
    const mobileNo = req.body.mobileNo || null
    const email = req.body.email || null
    const brand = req.body.brand
    try {
        if (email) {
            await artisanModel.create({ email, brand })
        }
        if (mobileNo) {
            await artisanModel.create({ mobileNo, brand })
        }
        console.log("artisan created")
        res.status(201).json({ message: "artisan created successfully" })
    } catch (error) {
        console.log("error at usersignUp:", error)
    }
}

export const artisanSignIn = async (req, res) => {
    const mobileNo = req.body.mobileNo || null
    const email = req.body.email || null

    var result;
    if (email) {
        result = await artisanModel.findOne({ email })

    }
    if (mobileNo) {
        result = await artisanModel.findOne({ mobileNo })
    }
    try {
        if (result) {

            const payload = {
                artisanId: result._id,
                user: result.email ? result.email : result.mobileNo
            }
            const token = generateToken(payload);
            res.cookie('jwt', token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'production' // Set secure flag in production
            });
            res.status(200).json({ success: true, message: result, user:"artisan" });

        }
        else {
            throw new Error("user not found")
        }


    } catch (error) {



        res.status(404).json({ message: "user not found" });
    }
}
export const userSignUp = async (req, res) => {
    const { email, name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        await customerModel.create({ email, name, password: hashedPassword })
        console.log("user created")
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log("error at usersignUp:", error)
    }
}

export const userSignIn = async (req, res) => {
    const { email, password } = req.body
    customerModel.findOne({ email: email }).then(async (result) => {
        const isVerified = await bcrypt.compare(password, result.password);
        if (isVerified) {
            const payload = {
                userId: result._id,
                email: email,
            };
            const token = generateToken(payload);
            res.cookie('jwt', token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'production' // Set secure flag in production
            });
            res.status(200).json({ success: true, message: result, user:"customer" });
        } else {
            res.status(401).json({ success: false });
        }
    }).catch((error) => {
        console.log(error);
        res.status(404).json({ message: "user not found" });
    });
}