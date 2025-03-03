import express from 'express'
import { userSignIn, userSignUp, artisanSignIn,artisanVerify, artisanSignUp, logout, adminSignIn } from '../controllers/auth.controller.js'
const authRouter = express.Router()
authRouter.post('/user/sign-up', userSignUp)
authRouter.post('/user/sign-in', userSignIn)
authRouter.post('/artisan/sign-up', artisanSignUp)
authRouter.post('/artisan/verify', artisanVerify)
authRouter.post('/artisan/sign-in', artisanSignIn)
authRouter.post('/logout', logout)
authRouter.post('/admin/sign-in', adminSignIn)
export default authRouter