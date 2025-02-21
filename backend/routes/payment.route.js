import express from 'express'
import { customerAuthMiddle } from '../middlewares/customer.middleware.js'
import { createOrder, verifyPayment } from '../controllers/payment.controller.js'
const paymentRouter = express.Router()
paymentRouter.post('/create-order', customerAuthMiddle, createOrder)
paymentRouter.post('/verify-order', customerAuthMiddle, verifyPayment)
export default paymentRouter