import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectToDb from './db/connectToDB.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/fairprice.route.js';
import paymentRouter from './routes/payment.route.js';
import productRouter from './routes/product.route.js';
dotenv.config()
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/admin', listingRouter)


app.listen(port, () => {
    connectToDb()
    console.log(`server is running on http://localhost:${port}/`)
})