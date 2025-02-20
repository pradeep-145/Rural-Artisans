import express from "express";
import { addMaterial, evaluatePrice } from "../controllers/fairprice.controller.js";

const listingRouter = express.Router();

listingRouter.post("/add-material",addMaterial);
listingRouter.post("/evaluate-price",evaluatePrice );
export default listingRouter;
