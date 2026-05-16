import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";
import HttpError from "../utils/HttpError.js";

export const createOrder = async (req, res, next) => {
    try {
        const { shippingAddress } = req.body;

        if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.phone) {
            return next(new HttpError(400, "Shipping address is required"));
        }

       
        const cart = await Cart.findOne({ user: req.user.userId })
            .populate("items.product", "price stock");

        if (!cart || cart.items.length === 0) {
            return next(new HttpError(400, "Cart is empty"));
        }

      
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return next(new HttpError(400, `Not enough stock for ${item.product.name}`));
            }
        }

    
        const order = await Order.create({
            user: req.user.userId,
            items: cart.items.map(item => ({
                product:  item.product._id,
                quantity: item.quantity,
                size:     item.size,
                color:    item.color,
                price:    item.product.price  
            })),
            totalPrice:      cart.totalPrice,
            shippingAddress
        });

        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity }
            });
        }

        
        await Cart.findOneAndDelete({ user: req.user.userId });

        res.status(201).json({ success: true, data: order });
    } catch (err) { next(err) }
};


export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate("items.product", "name imageUrl")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) { next(err) }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name price")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) { next(err) }
};


export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "shipped", "delivered", "cancelled"];

        if (!validStatuses.includes(status)) {
            return next(new HttpError(400, "Invalid status"));
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) return next(new HttpError(404, "Order not found"));

        res.status(200).json({ success: true, data: order });
    } catch (err) { next(err) }
};


export const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({
            _id:  req.params.id,
            user: req.user.userId
        });

        if (!order) return next(new HttpError(404, "Order not found"));

        if (order.status !== "pending") {
            return next(new HttpError(400, "Cannot cancel order after it has been shipped"));
        }

       
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            });
        }

        order.status = "cancelled";
        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (err) { next(err) }
};