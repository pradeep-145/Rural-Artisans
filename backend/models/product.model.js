import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    artisanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artisan",
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    tag: [{
        type: String,
        required: true
    }],
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerReview"
    }],
    rawMaterials: [{
        name: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    packagingCost: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Product", ProductSchema);
