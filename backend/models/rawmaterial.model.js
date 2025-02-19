import mongoose from "mongoose";
const RawMaterial = mongoose.model(
    "RawMaterial",
    new mongoose.Schema({
        name: String,
        price: Number,
    })
)
export default RawMaterial