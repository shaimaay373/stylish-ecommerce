import { Router } from "express";
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} from "../controllers/order.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(protect); 

router.post("/",          createOrder);
router.get("/my",         getMyOrders);
router.delete("/:id",     cancelOrder);


router.get("/",           adminOnly, getAllOrders);
router.put("/:id/status", adminOnly, updateOrderStatus);

export default router;