import express from "express";
import { addMaterial, evaluatePrice } from "../controllers/fairprice.controller.js";
import { adminAuthMiddleware } from "../middlewares/admin.middleware.js";

const listingRouter = express.Router();

listingRouter.post("/add-material",adminAuthMiddleware,addMaterial);
listingRouter.post("/evaluate-price",adminAuthMiddleware,evaluatePrice );
export default listingRouter;
