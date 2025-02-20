import mongoose, { mongo } from "mongoose";

export default mongoose.model("Product",mongoose.Schema({
    artisanId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Artisan",
    },
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    } ,
    description:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    rating:[{
        type:Number
    }],
    tag :[{
        type:String,
        required:true
    }],
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CustomerReview"
    }] 
}))