const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Brand = require('../models/Brands');
const mongoose = require('mongoose');

// ✅ Function to generate a unique productId
const generateProductId = (productName) => {
    if (!productName || typeof productName !== 'string') {
        throw new Error("Invalid productName: Must be a non-empty string.");
    }
    
    const letters = productName.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 3);
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return letters + numbers;
};

// ✅ CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
    const { productName, description, brandId, brandName, price, countInStock } = req.body;
    const productImg = req.files.map(file => file.path);

    // Find brand based on either brandId or brandName (for flexibility)
    let brand;
    
    if (brandId) {
        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({ message: "Invalid brandId format" });
        }
        brand = await Brand.findById(brandId);
    } else if (brandName) {
        brand = await Brand.findOne({ brandName });
    }    

    // Check if brand exists
    if (!brand) {
        return res.status(400).json({
            message: brandId 
                ? `Brand with ID ${brandId} not found` 
                : `Brand with name '${brandName}' not found. Please provide a valid brand.`
        });
    }
    if (!productName) {
        return res.status(400).json({ message: "Product name is required." });
    }

    // Create new product
    const productId = generateProductId(productName);
    const newProduct = new Product({
        productId,
        productName,
        description,
        brand: brand ? brand._id : null, // Store the brand's ObjectId for proper referencing
        productImg,
        price,
        countInStock
    });

    await newProduct.save();
    
    // Populate the brand details for the response
    const populatedProduct = await Product.findById(newProduct._id).populate('brand', 'brandName logo');
    res.status(201).json({ message: "Product created successfully", product: populatedProduct });
});

// ✅ GET ALL PRODUCTS
exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
        .populate('brand', 'brandName logo'); // Populate with selected brand fields
    res.status(200).json(products);
});

// ✅ GET PRODUCT BY ID
exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ productId: req.params.productId })
        .populate('brand', 'brandName logo description');

    if (!product) {
        res.status(404);
        throw new Error("Product not found!");
    }

    res.status(200).json(product);
});

// ✅ UPDATE PRODUCT
exports.updateProductById = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
        res.status(404);
        throw new Error("Product Not Found to Update.");
    }

    const { productName, price, description, brandId, brandName, replaceImages } = req.body;

    // Update brand reference if provided
    if (brandId || brandName) {
        let brand;
        
        if (brandId) {
            // Find by ID if provided
            if (!mongoose.Types.ObjectId.isValid(brandId)) {
                return res.status(400).json({ message: "Invalid brandId format" });
            }
            brand = await Brand.findById(brandId);
        } else if (brandName) {
            // Find by name if provided (for backwards compatibility)
            brand = await Brand.findOne({ brandName });
        }
        
        if (!brand) {
            return res.status(400).json({ 
                message: brandId 
                    ? `Brand with ID ${brandId} not found` 
                    : `Brand with name '${brandName}' not found`
            });
        }
        
        product.brand = brand._id;
    }

    // Update other fields
    product.productName = productName || product.productName;
    product.price = price || product.price;
    product.description = description || product.description;

    // ✅ Handle image uploads
    if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => file.path);
        if (replaceImages === 'true') {
            product.productImg = newImages; // Replace all images
        } else {
            product.productImg = [...product.productImg, ...newImages]; // Append new images
        }
    }

    const updatedProduct = await product.save();
    
    // Populate brand details for response
    const populatedProduct = await Product.findById(updatedProduct._id)
        .populate('brand', 'brandName logo description');
        
    res.status(200).json({ message: "Product updated successfully", product: populatedProduct });
});

// ✅ DELETE PRODUCT
exports.deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
});

// ✅ Get products by brand (new helper endpoint)
exports.getProductsByBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
        return res.status(400).json({ message: "Invalid brandId format" });
    }
    
    const products = await Product.find({ brand: brandId })
        .populate('brand', 'brandName logo');
        
    res.status(200).json(products);
});