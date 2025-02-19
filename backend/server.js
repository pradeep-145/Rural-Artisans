import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectToDb from './db/connectToDB.js';
import authRouter from './routes/auth.route.js';
dotenv.config()
const port =process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(cors())

app.use('/api/auth',authRouter)

app.listen(port,()=>{
    connectToDb()
    console.log(`server is running on http://localhost:${port}/`)
})