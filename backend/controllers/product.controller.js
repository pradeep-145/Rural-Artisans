import { v2 as cloudinary } from 'cloudinary';
import customerReviewModel from '../models/customerReview.model.js';
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getImageLink = async (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "uploads", resource_type: "auto" }, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result.url)
        }).end(image.buffer)
    })
}

export const saveProduct = async (req, res) => {
    const file = req.file;
    const artisanId = req.body.artisanId;
    if (!file) {
        return res.status(400).send("Please upload a file")
    }
    const link = await getImageLink(file);
    try {
        const product = await productModel.create({
            artisanId: artisanId,
            image: link,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            tag: req.body.tag
        })
        res.status(201).json(product)
    }
    catch (error) {
        console.log("error at saveProduct:", error)
        res.status(500).send("Internal Server Error")
    }

}

export const getUserProducts = async (req, res) => {
    try {
        const products = await productModel.find({ isVerified: true }).populate('review')
        
        res.status(200).json(products)
    }
    catch (error) {
        console.log("error at getProducts:", error)
        res.status(500).send("Internal Server Error")
    }

}

export const getArtisanProducts = async (req, res) => {
    const { artisanId } = req.params;
    try {
        const products = await productModel.find({ artisanId: artisanId }, { image: 1, name: 1, price: 1, quantity: 1, tag: 1 })
        res.status(200).json(products)
    }
    catch (error) {
        console.log("error at getProducts:", error)
        res.status(500).send("Internal Server Error")
    }
}

export const getUnverifiedProducts = async (req, res) => {
    try {
        const products = await productModel.find({ isVerified: false }, { artisanId: 1, image: 1, name: 1, price: 1, quantity: 1, tag: 1 })
        res.status(200).json(products)
    }
    catch (error) {
        console.log("error at getProducts:", error)
        res.status(500).send("Internal Server Error")
    }
}

export const getProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await productModel.findById(productId)
        res.status(200).json(product)
    }
    catch (error) {
        console.log("error at getProducts:", error)
        res.status(500).send("Internal Server Error")
    }

}

export const reviewProduct = async (req, res) => {
    const { productId, comment, rating } = req.body
    const customerId = req.user._id;

    try {
        const review = await customerReviewModel.create({
            productId,
            customerName,
            comment,
            rating
        })
        if (review) {

            const response = await productModel.findById(productId);
            response.review.push(review._id);
            await response.save();

        }
        res.status(200).json({ message: "Review added successfully" });
    } catch (error) {
        console.log("error at reviewProduct:", error)
        res.status(500).send("Internal Server Error")
    }
}

export const addToCart=async(req,res)=>{
    const {productId, customerId, quantity}=req.body;
    try {
        await cartModel.create({
            productId,
            customerId,
            quantity
        })
        res.status(200).json({message:"Product added to cart successfully"})
    } catch (error) {
        console.log("error at addToCart:", error)
        res.status(500).send("Internal Server Error")
    }
}

export const getCart=async(req,res)=>{
    const {customerId}=req.params;
    try {
        const cart=await cartModel.find({customerId:customerId}).populate({
            path: 'productId',
            select: 'name price image'
        })
        res.status(200).json(cart)
    }
    catch (error) {
        console.log("error at getCart:", error)
        res.status(500).send("Internal Server Error")
    }
    

}