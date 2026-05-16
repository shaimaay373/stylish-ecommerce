import Product from "../models/Product.js";
import HttpError from "../utils/HTTPError.js";

//create product
export const createProduct = async (req, res, next) => {
    try{
        const{name,description,price,category,size,color,imageUrl,stock} = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            category,
            size,
            color,
            imageUrl,
            stock
        });
        res.status(201).json(product);
    }catch(err){next(err)}
};
//get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const { category, size, color, minPrice, maxPrice, sort } = req.query; 

        const filter = {};

        if (category) filter.category = category;
        if (color) filter.color = { $in: [color] };
        if (size) filter.size = { $in: [size] };

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let sortOption = {};
        if (sort === "price_asc") sortOption = { price: 1 };
        else if (sort === "price_desc") sortOption = { price: -1 };
        else if (sort === "newest") sortOption = { createdAt: -1 };

        const products = await Product.find(filter).sort(sortOption); 

        res.status(200).json({ 
            success: true, 
            count: products.length, 
            data: products 
        });

    } catch (err) { next(err) }
};
//get product by id
export const getProductById = async(req,res,next)=>{
    try{
          const {id} =req.params;
          const product = await Product.findById(id);
          if(!product){
            return next(new HttpError("Product not found",404));
          }
          res.status(200).json({success:true,data:product});
    }catch(err){next(err)}
}
//update product
export const updateProduct = async(req,res,next)=>{
    try{
        const {id}= req.params;
        const updates = req.body;
        const newProduct = await Product.findByIdAndUpdate(id,updates,{new:true,runValidators:true});
        if(!newProduct){
            return next(new HttpError("Product not found",404));
        }
        res.status(200).json({success:true,data:newProduct});
    }catch(err){next(err)}
};
//delete Product
export const deleteProduct = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
          new HttpError(404, "Product not found");
        }
        res.status(200).json({success:true,data:product});
    }catch(err){next(err)}
}