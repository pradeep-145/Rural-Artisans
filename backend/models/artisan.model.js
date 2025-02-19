import mongoose from 'mongoose'

const artisanModel=mongoose.Schema({
    mobileNo:{
        type:Number
    },
    email:{
        type:String
    },
    brand:{
        type:String,
        required:true
    }
})

export default artisanModel