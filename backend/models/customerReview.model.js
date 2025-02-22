import mongoose from "mongoose";
const CustomerReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    
}, {timestamps: true});

export default mongoose.model("CustomerReview", CustomerReviewSchema);
