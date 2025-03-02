import express from "express";
import { addMaterial, evaluatePrice, getMaterials, verifyProduct } from "../controllers/fairprice.controller.js";
import { adminAuthMiddleware } from "../middlewares/admin.middleware.js";

const listingRouter = express.Router();

listingRouter.post("/add-material", addMaterial);
listingRouter.get("/get-material", getMaterials);
listingRouter.post("/evaluate-price", evaluatePrice);
listingRouter.post("/verify-product/:productId", verifyProduct);

export default listingRouter;
