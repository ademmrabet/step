const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brands');


const generateBrandId = (brandName) => {
    const letters = brandName.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 3);
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return letters + numbers;
};
// Create a New Brand with Logo Upload
exports.createBrand = asyncHandler(async (req, res) => {
    const { brandName, description } = req.body;

    // Check if logo was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Brand logo is required." });
    }

    // Check if a brand with the same name already exists
    const existingBrandName = await Brand.findOne({ brandName });
    if (existingBrandName) {
        return res.status(400).json({ message: "Brand with this name already exists." });
    }

    // Generate the brand ID
    const brandId = generateBrandId(brandName);
    
    // Double-check that this specific ID isn't already in use (unlikely but possible)
    const existingBrandId = await Brand.findOne({ brandId });
    if (existingBrandId) {
        // In the rare case of a collision, regenerate
        brandId = generateBrandId(brandName + Date.now());
    }

    const newBrand = new Brand({
        brandId,
        brandName,
        description,
        logo: req.file.path // Store logo path
    });

    await newBrand.save();
    res.status(201).json({ message: "Brand created successfully", brand: newBrand });
});

// Get All Brands
exports.getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    res.status(200).json(brands);
});

//  Get a Brand by ID
exports.getBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findOne({ brandId: req.params.brandId });
    if (!brand) {
        return res.status(404).json({ message: "Brand not found." });
    }
    res.status(200).json(brand);
});

//  Update a Brand by ID (Allow Updating Logo)
exports.updateBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findOne({ brandId: req.params.brandId });
    if (!brand) {
        return res.status(404).json({ message: "Brand not found." });
    }

    const { brandName, description } = req.body;
    brand.brandName = brandName || brand.brandName;
    brand.description = description || brand.description;

    //Update logo if a new image is uploaded
    if (req.file) {
        brand.logo = req.file.path;
    }

    const updatedBrand = await brand.save();
    res.status(200).json({ message: "Brand updated successfully", brand: updatedBrand });
});

//  Delete a Brand by ID
exports.deleteBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findOne({ brandId: req.params.brandId });
    if (!brand) {
        return res.status(404).json({ message: "Brand not found." });
    }

    await brand.deleteOne();
    res.status(200).json({ message: "Brand deleted successfully" });
});
