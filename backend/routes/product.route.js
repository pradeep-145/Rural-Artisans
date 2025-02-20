import express from 'express'
import {saveProduct,getUserProducts, getArtisanProducts, getUnverifiedProducts,getProduct} from '../controllers/product.controller.js'
import multer from 'multer'
import { artisanAuthMiddleware } from '../middlewares/artisan.middleware.js';
import { customerAuthMiddle } from '../middlewares/customer.middleware.js';
import { adminAuthMiddleware } from '../middlewares/admin.middleware.js';
const productRouter=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage})
productRouter.post('/save',upload.single("image"),artisanAuthMiddleware, saveProduct)
productRouter.get('/users/get',customerAuthMiddle, getUserProducts)
productRouter.get('/artisan/get/:artisanId',artisanAuthMiddleware, getArtisanProducts)
productRouter.get('/product/:productId',customerAuthMiddle, getProduct)
productRouter.get('/admin/get',adminAuthMiddleware, getUnverifiedProducts)
export default productRouter;