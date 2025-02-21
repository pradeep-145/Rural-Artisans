import express from "express";
import { addMaterial, evaluatePrice, getMaterials } from "../controllers/fairprice.controller.js";
import { adminAuthMiddleware } from "../middlewares/admin.middleware.js";

const listingRouter = express.Router();

listingRouter.post("/add-material", adminAuthMiddleware, addMaterial);
listingRouter.post("/get-material", adminAuthMiddleware, getMaterials);
listingRouter.post("/evaluate-price", adminAuthMiddleware, evaluatePrice);
export default listingRouter;
