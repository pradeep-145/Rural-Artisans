import express from 'express'
import {saveProduct,getProducts} from '../controllers/product.controller.js'
import multer from 'multer'
const productRouter=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage})
productRouter.post('/save',upload.single("image"), saveProduct)
productRouter.get('/get',getProducts)
export default productRouter;