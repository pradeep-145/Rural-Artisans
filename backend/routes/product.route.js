import express from 'express'
import {saveProduct,getUserProducts, getArtisanProducts, getUnverifiedProducts,getProduct, reviewProduct} from '../controllers/product.controller.js'
import multer from 'multer'
import { artisanAuthMiddleware } from '../middlewares/artisan.middleware.js';
import { customerAuthMiddle } from '../middlewares/customer.middleware.js';
import { adminAuthMiddleware } from '../middlewares/admin.middleware.js';
const productRouter=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage})
productRouter.post('/save/:artisanId',upload.single("image"),artisanAuthMiddleware, saveProduct)
productRouter.get('/get', getUserProducts)
productRouter.get('/artisan/get/:artisanId',artisanAuthMiddleware, getArtisanProducts)
productRouter.get('/product/:productId', getProduct)
productRouter.get('/admin/get',adminAuthMiddleware, getUnverifiedProducts)
productRouter.post('/review/save',customerAuthMiddle, reviewProduct)
export default productRouter;