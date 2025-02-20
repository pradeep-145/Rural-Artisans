import express from 'express'
import {saveProduct,getUserProducts, getArtisanProducts, getUnverifiedProducts,getProduct} from '../controllers/product.controller.js'
import multer from 'multer'
const productRouter=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage})
productRouter.post('/save',upload.single("image"), saveProduct)
productRouter.get('/users/get',getUserProducts)
productRouter.get('/artisan/get/:artisanId',getArtisanProducts)
productRouter.get('/product/:productId',getProduct)
productRouter.get('/admin/get',getUnverifiedProducts)
export default productRouter;