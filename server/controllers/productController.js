const asyncHandler = require('express-async-handler');
const Products = require('../models/Product');
const Brands = require('../models/Brands');
const Brand = require('../models/Brands');
const Product = require('../models/Product');

//function to generate productId
const generateProductId = (productName) => {
    const letters = productName.replace(/[^a-zA-Z]/g, '').toUpperCase().subString(0,3);
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return letters + numbers;
};

//CREATE
exports.createProduct = asyncHandler(async(req, res) => {
    const {productName,description,brandId,price,countInStock} = req.body;
    const productImg = req.files.map(file => file.path);

    //check if brandId exists
    const brand = await Brand.findOne({brandId});
    if (!brand) {
        res.status(400)
        throw new Error("Brand not found. Please provide a valid brandId.");
    }

    const productId = generateProductId(productName);
    const newProduct = new Products({
        productId,
        productName,
        description,
        Brand,
        productImg,
        price,
        countInStock
    });
    await newProduct.save();
    res.status(201).json({message: "Product created successfully", product: newProduct});
});

//Get All Products
exports.getAllProducts = asyncHandler(async(req, res) => {
    const products = await Product.find().populate({
        path:'brand',
        select: 'brandName'
    });
    res.status(200).json(products)
});

//Get Products by Id
exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Products.findOne({productId: req.params.productId}).populate({
        path:'brand',
        select:'brandName'
    });
    if(!product) {
        res.status(404)
        throw new Error("Product not found!");
    }
    res.status(200).json(product)
});

//Update a product
exports.updateProductById = asyncHandler(async (req, res) => {
    const product = await Product.findOne({productId:req.params.productId});
    if(!product) {
        res.status(404);
        throw new Error("Product Not Found to Update.");
    }
    const {productName, price, description, replaceImages} = req.body;
    product.productName = productName || product.productName;
    product.price = price || product.price;
    product.description = description || product.description;

    if(req.files && req.files.length > 0) {
        const newImages = req.files.map(file=>file.path);
        if (replaceImages === 'true'){
            product.productImg = newImages;
        }else{
            product.productImg = [...product.productImg, ...newImages];
        }
    }

    const updatedProduct = await product.save();
    res.status(200).json({message: "product updated successfully", product: updatedProduct})
});

//Delete a PRODUCT
exports.deleteProductById = asyncHandler(async(req, res)=>{
    const product = await Product.findOne({productId: req.params.productId});
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }

    await product.deleteOne();
    res.status(200).json({message: "product deleted successfully"});
});