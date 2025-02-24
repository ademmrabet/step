const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brands');

// Create a New Brand with Logo Upload
exports.createBrand = asyncHandler(async (req, res) => {
    const { brandId, brandName, description } = req.body;

    // Check if logo was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Brand logo is required." });
    }

    const existingBrand = await Brand.findOne({ brandId });
    if (existingBrand) {
        return res.status(400).json({ message: "Brand ID already exists." });
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
