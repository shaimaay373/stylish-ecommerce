import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    description: String,
    stock: Number,
    size: [String],
    color: [String],
    imageUrl: String,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

const products = [
  // ─── MEN ───────────────────────────────────────────────
  {
    name: "Classic Oxford Shirt",
    price: 49.99,
    category: "men",
    description:
      "Premium cotton oxford shirt, perfect for both casual and formal occasions.",
    stock: 80,
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["White", "Light Blue", "Navy"],
    imageUrl:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  },
  {
    name: "Slim Fit Chino Pants",
    price: 59.99,
    category: "men",
    description:
      "Modern slim fit chinos made from stretch cotton blend for all-day comfort.",
    stock: 60,
    size: ["30", "32", "34", "36", "38"],
    color: ["Beige", "Olive", "Navy", "Black"],
    imageUrl:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    name: "Casual Linen Blazer",
    price: 129.99,
    category: "men",
    description:
      "Lightweight linen blazer, ideal for summer events and smart-casual looks.",
    stock: 35,
    size: ["S", "M", "L", "XL"],
    color: ["Beige", "Light Grey", "Navy"],
    imageUrl:
      "https://images.unsplash.com/photo-1555069519-127aadecd574?w=600&q=80",
  },
  {
    name: "Essential Crew Neck Tee",
    price: 24.99,
    category: "men",
    description:
      "Soft 100% cotton crew neck t-shirt, a wardrobe essential in every color.",
    stock: 150,
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["White", "Black", "Grey", "Navy", "Olive"],
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    name: "Slim Denim Jeans",
    price: 69.99,
    category: "men",
    description:
      "Classic slim-fit denim jeans with a modern cut and comfortable stretch fabric.",
    stock: 90,
    size: ["30", "32", "34", "36"],
    color: ["Dark Blue", "Black", "Light Blue"],
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
  },

  // ─── WOMEN ─────────────────────────────────────────────
  {
    name: "Floral Wrap Dress",
    price: 79.99,
    category: "women",
    description:
      "Elegant floral wrap dress in a flattering silhouette, perfect for any occasion.",
    stock: 55,
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Floral Pink", "Floral Blue", "Floral White"],
    imageUrl:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
  },
  {
    name: "High-Waist Tailored Trousers",
    price: 64.99,
    category: "women",
    description:
      "Sophisticated high-waist trousers with a tailored fit, suitable for office and outings.",
    stock: 45,
    size: ["XS", "S", "M", "L"],
    color: ["Black", "Camel", "White", "Grey"],
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4457?w=600&q=80",
  },
  {
    name: "Oversized Knit Sweater",
    price: 54.99,
    category: "women",
    description:
      "Cozy oversized knit sweater in a relaxed fit, great for layering in cooler weather.",
    stock: 70,
    size: ["S", "M", "L"],
    color: ["Cream", "Dusty Rose", "Sage Green", "Camel"],
    imageUrl:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
  },
  {
    name: "Satin Slip Skirt",
    price: 44.99,
    category: "women",
    description:
      "Luxurious satin slip skirt with a bias cut, effortlessly elegant for evenings out.",
    stock: 40,
    size: ["XS", "S", "M", "L"],
    color: ["Champagne", "Black", "Dusty Rose"],
    imageUrl:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
  },
  {
    name: "Classic White Button-Up",
    price: 44.99,
    category: "women",
    description: "A timeless white button-up shirt in crisp poplin fabric.",
    stock: 100,
    size: ["XS", "S", "M", "L", "XL"],
    color: ["White", "Light Blue", "Stripe"],
    imageUrl:
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=600&q=80",
  },

  // ─── KIDS ──────────────────────────────────────────────
  {
    name: "Kids Graphic Tee",
    price: 19.99,
    category: "kids",
    description:
      "Fun and colorful graphic tee made from soft breathable cotton.",
    stock: 120,
    size: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    color: ["Blue", "Red", "Yellow", "Green"],
    imageUrl:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
  },
  {
    name: "Kids Denim Dungarees",
    price: 34.99,
    category: "kids",
    description: "Adorable denim dungarees with adjustable straps.",
    stock: 65,
    size: ["2-3Y", "3-4Y", "5-6Y", "7-8Y"],
    color: ["Light Blue", "Dark Blue"],
    imageUrl:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
  },

  // ─── ACCESSORIES ───────────────────────────────────────
  {
    name: "Leather Waist Belt",
    price: 34.99,
    category: "accessories",
    description: "Genuine leather belt with a classic silver buckle.",
    stock: 75,
    size: ["S", "M", "L", "XL"],
    color: ["Black", "Brown", "Tan"],
    imageUrl:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
  },
  {
    name: "Classic Sunglasses",
    price: 39.99,
    category: "accessories",
    description: "Timeless aviator sunglasses with UV400 protection.",
    stock: 60,
    size: ["One Size"],
    color: ["Gold/Brown", "Silver/Grey", "Black/Black"],
    imageUrl:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🗑️ Cleared existing products");

    await Product.insertMany(products);
    console.log(`🌱 Seeded ${products.length} products successfully!`);

    console.log("\nProducts by category:");
    const men = products.filter((p) => p.category === "men").length;
    const women = products.filter((p) => p.category === "women").length;
    const kids = products.filter((p) => p.category === "kids").length;
    const acc = products.filter((p) => p.category === "accessories").length;

    console.log(`  👔 Men: ${men}`);
    console.log(`  👗 Women: ${women}`);
    console.log(`  🧒 Kids: ${kids}`);
    console.log(`  👜 Accessories: ${acc}`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected. Done!");
  }
}

seed();
