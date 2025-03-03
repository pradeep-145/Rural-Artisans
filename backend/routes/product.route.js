import express from 'express';
import multer from 'multer';
import { addToCart, addToWishlist, deleteCart, getArtisanProducts, getCart, getUnverifiedProducts, getUserProducts, getWishlist, reviewProduct, saveProduct, updateCart } from '../controllers/product.controller.js';
import { customerAuthMiddle } from '../middlewares/customer.middleware.js';
const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
productRouter.post('/save', upload.single("image"), saveProduct)
productRouter.get('/get', getUserProducts)
productRouter.get('/artisan/get/:artisanId', getArtisanProducts)
productRouter.get('/admin/get', getUnverifiedProducts)
productRouter.post('/review/save', customerAuthMiddle, reviewProduct)
productRouter.post('/cart/add', customerAuthMiddle, addToCart)
productRouter.get('/cart/get/:customerId', customerAuthMiddle, getCart)
productRouter.post('/cart/update', customerAuthMiddle, updateCart)
productRouter.post('/wishlist/add', customerAuthMiddle, addToWishlist)
productRouter.get('/wishlist/get/:customerId', customerAuthMiddle, getWishlist)
productRouter.delete('/cart/delete/:id', customerAuthMiddle, deleteCart)
export default productRouter;