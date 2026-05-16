import Cart from "../models/Cart.js";
import Product from "../models/product.js";
import HttpError from "../utils/HttpError.js";

// Get cart
export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId })
            .populate("items.product", "name price imageUrl"); 

        if (!cart) {
            return res.status(200).json({ success: true, data: { items: [], totalPrice: 0 } });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (err) { next(err) }
};

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const product = await Product.findById(productId);
        if (!product) return next(new HttpError(404, "Product not found"));

       
        if (product.stock < quantity) {
            return next(new HttpError(400, "Not enough stock"));
        }

        let cart = await Cart.findOne({ user: req.user.userId });

    
        if (!cart) {
            cart = await Cart.create({
                user: req.user.userId,
                items: [{ product: productId, quantity, size, color }],
                totalPrice: product.price * quantity
            });
        } else {
            
            const existingItem = cart.items.find(
                item => item.product.toString() === productId &&
                        item.size === size &&
                        item.color === color
            );

            if (existingItem) {
              
                existingItem.quantity += quantity;
            } else {
            
                cart.items.push({ product: productId, quantity, size, color });
            }

           
            const populatedCart = await cart.populate("items.product", "price");
            cart.totalPrice = populatedCart.items.reduce(
                (total, item) => total + item.product.price * item.quantity, 0
            );

            await cart.save();
        }

        res.status(200).json({ success: true, data: cart });
    } catch (err) { next(err) }
};

export const updateQuantity = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) return next(new HttpError(400, "Quantity cannot be less than 1"));

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return next(new HttpError(404, "Cart not found"));

        const item = cart.items.id(itemId);
        if (!item) return next(new HttpError(404, "Item not found"));

        item.quantity = quantity;

        const populatedCart = await cart.populate("items.product", "price");
        cart.totalPrice = populatedCart.items.reduce(
            (total, item) => total + item.product.price * item.quantity, 0
        );

        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (err) { next(err) }
};


export const removeItem = async (req, res, next) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return next(new HttpError(404, "Cart not found"));

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

      
        const populatedCart = await cart.populate("items.product", "price");
        cart.totalPrice = populatedCart.items.reduce(
            (total, item) => total + item.product.price * item.quantity, 0
        );

        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (err) { next(err) }
};


export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOneAndDelete({ user: req.user.userId });
        if (!cart) return next(new HttpError(404, "Cart not found"));
        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (err) { next(err) }
};