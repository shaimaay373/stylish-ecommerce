import { Router } from "express";
import {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:itemId", updateQuantity);
router.delete("/:itemId", removeItem);
router.delete("/", clearCart);

export default router;