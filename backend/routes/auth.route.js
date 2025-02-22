import express from 'express'
import {userSignIn,userSignUp, artisanSignIn,artisanSignUp, logout} from '../controllers/auth.controller.js'
const authRouter=express.Router()
authRouter.post('/user/sign-up',userSignUp)
authRouter.post('/user/sign-in',userSignIn)
authRouter.post('/artisan/sign-up',artisanSignUp)
authRouter.post('/artisan/sign-in',artisanSignIn)
authRouter.post('/logout',logout)

export default authRouter