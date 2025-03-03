import productModel from "../models/product.model.js";
import RawMaterial from "../models/rawmaterial.model.js";
const isPriceReasonable = (sellerPrice, adminPrice) => {
    const tolerance = 0.3;
    return sellerPrice <= adminPrice * (1 + tolerance);
};

export const addMaterial = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price || price <= 0) {
            return res.status(400).json({ error: "Invalid material name or price" });
        }

        let material = await RawMaterial.findOne({ name });

        if (material) {

            material.price = price;
            await material.save();
            return res.status(200).json({ message: `Updated ${name} price to ${price}` });
        }

        const newMaterial = new RawMaterial({ name, price });
        await newMaterial.save();

        return res.status(201).json({ message: `Added new material: ${name} with price ${price}` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMaterials = async (req, res) => {
    try {
        const materials = await RawMaterial.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const verifyProduct = async (req, res) => {
    console.log("adkn")
    try {
        const productToBeVerified = await productModel.findOneAndUpdate({ _id: req.params.productId }, { isVerified: true })
        console.log(productToBeVerified);
        res.status(200).json();
    }
    catch (error) {
        console.log(error);
    }
}

export const evaluatePrice = async (req, res) => {
    try {
        const { product } = req.body;
        
        if (!product || !product.rawMaterials || !product.packagingCost || !product.price || !product.quantity) {
            
            return res.status(400).json({ error: "Missing required fields in product data" });
        }
        
        let adminTotalRawCost = 0;
        let sellerTotalRawCost = 0;
        
        for (const item of product.rawMaterials) {
            const adminRaw = await RawMaterial.findOne({ name: item.name })
            if (!adminRaw) {
                console.log(item.name);
                
                return res.status(400).json({ error: `Raw material ${item.name} not found in database` });
            }
            
            adminTotalRawCost += adminRaw.price * item.quantity;
            sellerTotalRawCost += item.cost * item.quantity;
                console.log(adminTotalRawCost);
                
            if (!isPriceReasonable(item.cost, adminRaw.price)) {
                return res.status(400).json({
                    message: `Product listing not possible. Seller's price for ${item.name} is too high.`,
                });
            }
        }

        const costWithoutProfit = adminTotalRawCost + product.packagingCost;
        const profitMargin = ((product.price - costWithoutProfit) / costWithoutProfit) * 100;

        if (profitMargin < 10 || profitMargin > 50) {
            return res.status(400).json({
                message: `Product listing not possible. Profit margin (${profitMargin.toFixed(2)}%) is unreasonable.`,
            });
        }

        return res.status(200).json({
            message: "Product listing is possible.",
            profitMargin: `${profitMargin.toFixed(2)}%`,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};