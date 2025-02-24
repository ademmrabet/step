const asyncHandler = require('express-async-handler');
const Discount = require('../models/Discounts');

// Create a new discount
exports.createDiscount = asyncHandler(async (req, res) => {
    const { code, value, type, criteria, expiresAt } = req.body;

    const existingDiscount = await Discount.findOne({ code });
    if (existingDiscount) {
        return res.status(400).json({ message: "Discount code already exists." });
    }

    const newDiscount = new Discount({
        code,
        value,
        type,
        criteria,
        expiresAt
    });

    await newDiscount.save();
    res.status(201).json({ message: "Discount created successfully", discount: newDiscount });
});

// Get all discounts
exports.getAllDiscounts = asyncHandler(async (req, res) => {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
});

// Get a discount by code
exports.getDiscountByCode = asyncHandler(async (req, res) => {
    const discount = await Discount.findOne({ code: req.params.code });
    if (!discount) {
        return res.status(404).json({ message: "Discount not found." });
    }
    res.status(200).json(discount);
});

// Update discount by code
exports.updateDiscountByCode = asyncHandler(async (req, res) => {
    const discount = await Discount.findOne({ code: req.params.code });
    if (!discount) {
        return res.status(404).json({ message: "Discount not found." });
    }

    const { value, type, criteria, active, expiresAt } = req.body;
    discount.value = value !== undefined ? value : discount.value;
    discount.type = type || discount.type;
    discount.criteria = criteria || discount.criteria;
    discount.active = active !== undefined ? active : discount.active;
    discount.expiresAt = expiresAt || discount.expiresAt;

    const updatedDiscount = await discount.save();
    res.status(200).json({ message: "Discount updated successfully", discount: updatedDiscount });
});

// Delete discount by code
exports.deleteDiscountByCode = asyncHandler(async (req, res) => {
    const discount = await Discount.findOne({ code: req.params.code });
    if (!discount) {
        return res.status(404).json({ message: "Discount not found." });
    }

    await discount.deleteOne();
    res.status(200).json({ message: "Discount deleted successfully" });
});
