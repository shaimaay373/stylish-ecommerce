import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ["men", "women", "kids", "accessories"]
    },
    size: {
        type: [String],
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);