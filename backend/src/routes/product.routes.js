import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { validateProduct, validateProductUpdate } from "../middlewares/productValidation.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";



const router = Router();

router.get("/", getAllProducts);         
router.get("/:id", getProductById);     
router.post("/", protect, adminOnly, validateProduct, createProduct);       
router.put("/:id", protect, adminOnly, validateProductUpdate, updateProduct); 
router.delete("/:id", deleteProduct);    

export default router;