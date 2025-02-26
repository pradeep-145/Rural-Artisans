import mongoose from "mongoose";


export default  mongoose.model('Whishlist',
    mongoose.Schema({
       customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    quantity:{
        type:Number,
        required:true
    }
    })
)