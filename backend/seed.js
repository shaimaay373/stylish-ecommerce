import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Product from "./src/models/Product.js";
import Order from "./src/models/Order.js";
import Cart from "./src/models/Cart.js";

dotenv.config();

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const productData = [
  // ─── MEN (5) ─────────────────────────────────────────────
  {
    name: "Classic Oxford Shirt",
    price: 49.99,
    category: "men",
    description: "Premium cotton oxford shirt, perfect for both casual and formal occasions.",
    stock: 80,
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["White", "Light Blue", "Navy"],
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  },
  {
    name: "Slim Fit Chino Pants",
    price: 59.99,
    category: "men",
    description: "Modern slim fit chinos made from stretch cotton blend for all-day comfort.",
    stock: 60,
    size: ["S", "M", "L", "XL"],
    color: ["Beige", "Olive", "Navy", "Black"],
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    name: "Casual Linen Blazer",
    price: 129.99,
    category: "men",
    description: "Lightweight linen blazer, ideal for summer events and smart-casual looks.",
    stock: 35,
    size: ["S", "M", "L", "XL"],
    color: ["Beige", "Light Grey", "Navy"],
    imageUrl: "https://images.unsplash.com/photo-1555069519-127aadecd574?w=600&q=80",
  },
  {
    name: "Essential Crew Neck Tee",
    price: 24.99,
    category: "men",
    description: "Soft 100% cotton crew neck t-shirt, a wardrobe essential in every color.",
    stock: 150,
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["White", "Black", "Grey", "Navy", "Olive"],
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    name: "Slim Denim Jeans",
    price: 69.99,
    category: "men",
    description: "Classic slim-fit denim jeans with a modern cut and comfortable stretch fabric.",
    stock: 90,
    size: ["S", "M", "L", "XL"],
    color: ["Dark Blue", "Black", "Light Blue"],
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
  },

  // ─── WOMEN (5) ───────────────────────────────────────────
  {
    name: "Floral Wrap Dress",
    price: 79.99,
    category: "women",
    description: "Elegant floral wrap dress in a flattering silhouette, perfect for any occasion.",
    stock: 55,
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Floral Pink", "Floral Blue", "Floral White"],
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
  },
  {
    name: "High-Waist Tailored Trousers",
    price: 64.99,
    category: "women",
    description: "Sophisticated high-waist trousers with a tailored fit, suitable for office and outings.",
    stock: 45,
    size: ["XS", "S", "M", "L"],
    color: ["Black", "Camel", "White", "Grey"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4457?w=600&q=80",
  },
  {
    name: "Oversized Knit Sweater",
    price: 54.99,
    category: "women",
    description: "Cozy oversized knit sweater in a relaxed fit, great for layering in cooler weather.",
    stock: 70,
    size: ["S", "M", "L"],
    color: ["Cream", "Dusty Rose", "Sage Green", "Camel"],
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
  },
  {
    name: "Satin Slip Skirt",
    price: 44.99,
    category: "women",
    description: "Luxurious satin slip skirt with a bias cut, effortlessly elegant for evenings out.",
    stock: 40,
    size: ["XS", "S", "M", "L"],
    color: ["Champagne", "Black", "Dusty Rose"],
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
  },
  {
    name: "Classic White Button-Up",
    price: 44.99,
    category: "women",
    description: "A timeless white button-up shirt in crisp poplin fabric.",
    stock: 100,
    size: ["XS", "S", "M", "L", "XL"],
    color: ["White", "Light Blue", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=600&q=80",
  },

  // ─── KIDS (2) ────────────────────────────────────────────
  {
    name: "Kids Graphic Tee",
    price: 19.99,
    category: "kids",
    description: "Fun and colorful graphic tee made from soft breathable cotton.",
    stock: 120,
    size: ["XS", "S", "M", "L"],
    color: ["Blue", "Red", "Yellow", "Green"],
    imageUrl: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
  },
  {
    name: "Kids Denim Dungarees",
    price: 34.99,
    category: "kids",
    description: "Adorable denim dungarees with adjustable straps.",
    stock: 65,
    size: ["XS", "S", "M"],
    color: ["Light Blue", "Dark Blue"],
    imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
  },

  // ─── ACCESSORIES (2) ─────────────────────────────────────
  {
    name: "Leather Waist Belt",
    price: 34.99,
    category: "accessories",
    description: "Genuine leather belt with a classic silver buckle.",
    stock: 75,
    size: ["S", "M", "L", "XL"],
    color: ["Black", "Brown", "Tan"],
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
  },
  {
    name: "Classic Sunglasses",
    price: 39.99,
    category: "accessories",
    description: "Timeless aviator sunglasses with UV400 protection.",
    stock: 60,
    size: ["S", "M", "L"],
    color: ["Gold/Brown", "Silver/Grey", "Black/Black"],
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  },
];

// ─────────────────────────────────────────────────────────────
// SEED
// ─────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // 1. Clear everything
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Cart.deleteMany({}),
    ]);
    console.log("🗑️  Cleared: users, products, orders, carts\n");

    // ─── 2. USERS ──────────────────────────────────────────
    const [adminPwd, userPwd] = await Promise.all([
      bcrypt.hash("admin1234", 10),
      bcrypt.hash("password123", 10),
    ]);

    const [admin, ahmed, sara, omar] = await User.insertMany([
      { name: "Admin",        email: "admin@stylish.com",  password: adminPwd, role: "admin" },
      { name: "Ahmed Hassan", email: "ahmed@example.com",  password: userPwd,  role: "user"  },
      { name: "Sara Mohamed", email: "sara@example.com",   password: userPwd,  role: "user"  },
      { name: "Omar Ali",     email: "omar@example.com",   password: userPwd,  role: "user"  },
    ]);
    console.log("👤 Seeded 4 users:");
    console.log("   🔑 admin@stylish.com   / admin1234   (admin)");
    console.log("   👤 ahmed@example.com   / password123");
    console.log("   👤 sara@example.com    / password123");
    console.log("   👤 omar@example.com    / password123\n");

    // ─── 3. PRODUCTS ───────────────────────────────────────
    const products = await Product.insertMany(productData);

    const byName = (n) => products.find((p) => p.name === n);
    const oxfordShirt     = byName("Classic Oxford Shirt");
    const chinosPants     = byName("Slim Fit Chino Pants");
    const linenBlazer     = byName("Casual Linen Blazer");
    const crewNeckTee     = byName("Essential Crew Neck Tee");
    const denimJeans      = byName("Slim Denim Jeans");
    const wrapDress       = byName("Floral Wrap Dress");
    const trousers        = byName("High-Waist Tailored Trousers");
    const knitSweater     = byName("Oversized Knit Sweater");
    const satinSkirt      = byName("Satin Slip Skirt");
    const buttonUp        = byName("Classic White Button-Up");
    const belt            = byName("Leather Waist Belt");
    const sunglasses      = byName("Classic Sunglasses");

    console.log(`👗 Seeded ${products.length} products across all categories\n`);

    // ─── 4. ORDERS ─────────────────────────────────────────
    await Order.insertMany([
      // ── Ahmed: 3 orders ──
      {
        user: ahmed._id,
        status: "delivered",
        shippingAddress: { street: "12 Tahrir Square", city: "Cairo", phone: "01012345678" },
        items: [
          { product: oxfordShirt._id, quantity: 2, size: "M", color: "White",     price: oxfordShirt.price },
          { product: crewNeckTee._id, quantity: 1, size: "L", color: "Black",     price: crewNeckTee.price },
        ],
        totalPrice: oxfordShirt.price * 2 + crewNeckTee.price * 1,
        createdAt: daysAgo(20),
      },
      {
        user: ahmed._id,
        status: "shipped",
        shippingAddress: { street: "12 Tahrir Square", city: "Cairo", phone: "01012345678" },
        items: [
          { product: denimJeans._id, quantity: 1, size: "M", color: "Dark Blue", price: denimJeans.price },
        ],
        totalPrice: denimJeans.price,
        createdAt: daysAgo(7),
      },
      {
        user: ahmed._id,
        status: "pending",
        shippingAddress: { street: "12 Tahrir Square", city: "Cairo", phone: "01012345678" },
        items: [
          { product: belt._id,        quantity: 1, size: "M", color: "Black",     price: belt.price },
          { product: sunglasses._id,  quantity: 1, size: "M", color: "Gold/Brown",price: sunglasses.price },
        ],
        totalPrice: belt.price + sunglasses.price,
        createdAt: daysAgo(1),
      },

      // ── Sara: 3 orders ──
      {
        user: sara._id,
        status: "delivered",
        shippingAddress: { street: "5 Ramses St", city: "Alexandria", phone: "01098765432" },
        items: [
          { product: wrapDress._id,  quantity: 1, size: "S", color: "Floral Pink", price: wrapDress.price },
          { product: satinSkirt._id, quantity: 1, size: "S", color: "Black",        price: satinSkirt.price },
        ],
        totalPrice: wrapDress.price + satinSkirt.price,
        createdAt: daysAgo(30),
      },
      {
        user: sara._id,
        status: "cancelled",
        shippingAddress: { street: "5 Ramses St", city: "Alexandria", phone: "01098765432" },
        items: [
          { product: knitSweater._id, quantity: 2, size: "M", color: "Cream", price: knitSweater.price },
        ],
        totalPrice: knitSweater.price * 2,
        createdAt: daysAgo(15),
      },
      {
        user: sara._id,
        status: "pending",
        shippingAddress: { street: "5 Ramses St", city: "Alexandria", phone: "01098765432" },
        items: [
          { product: trousers._id, quantity: 1, size: "S", color: "Black", price: trousers.price },
        ],
        totalPrice: trousers.price,
        createdAt: daysAgo(2),
      },

      // ── Omar: 2 orders ──
      {
        user: omar._id,
        status: "shipped",
        shippingAddress: { street: "88 Gezirah St", city: "Giza", phone: "01155566677" },
        items: [
          { product: linenBlazer._id, quantity: 1, size: "L", color: "Navy", price: linenBlazer.price },
        ],
        totalPrice: linenBlazer.price,
        createdAt: daysAgo(5),
      },
      {
        user: omar._id,
        status: "pending",
        shippingAddress: { street: "88 Gezirah St", city: "Giza", phone: "01155566677" },
        items: [
          { product: chinosPants._id, quantity: 1, size: "M",  color: "Beige", price: chinosPants.price },
          { product: crewNeckTee._id, quantity: 2, size: "M",  color: "White", price: crewNeckTee.price },
        ],
        totalPrice: chinosPants.price + crewNeckTee.price * 2,
        createdAt: daysAgo(1),
      },
    ]);
    console.log("📦 Seeded 8 orders (delivered / shipped / pending / cancelled)\n");

    // ─── 5. CARTS ──────────────────────────────────────────
    await Cart.insertMany([
      {
        user: ahmed._id,
        items: [
          { product: linenBlazer._id, quantity: 1, size: "M", color: "Beige"     },
          { product: sunglasses._id,  quantity: 1, size: "M", color: "Silver/Grey" },
        ],
        totalPrice: linenBlazer.price + sunglasses.price,
      },
      {
        user: sara._id,
        items: [
          { product: buttonUp._id,    quantity: 2, size: "S", color: "White"     },
          { product: knitSweater._id, quantity: 1, size: "M", color: "Sage Green" },
        ],
        totalPrice: buttonUp.price * 2 + knitSweater.price,
      },
      {
        user: omar._id,
        items: [
          { product: crewNeckTee._id, quantity: 3, size: "L", color: "Navy"      },
        ],
        totalPrice: crewNeckTee.price * 3,
      },
    ]);
    console.log("🛒 Seeded 3 carts\n");

    // ─── Summary ───────────────────────────────────────────
    console.log("═══════════════════════════════════════════");
    console.log("  SEEDING COMPLETE — Test credentials:");
    console.log("═══════════════════════════════════════════");
    console.log("  Admin   → admin@stylish.com  / admin1234");
    console.log("  User 1  → ahmed@example.com  / password123");
    console.log("  User 2  → sara@example.com   / password123");
    console.log("  User 3  → omar@example.com   / password123");
    console.log("═══════════════════════════════════════════\n");

  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected. Done!");
  }
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

seed();
