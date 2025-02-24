const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: { type: Number, required: true, unique: true }, // Unique discount code
    value: { type: Number, required: true }, // Discount amount (percentage or fixed)
    type: { type: String, enum: ['percentage', 'fixed'], required: true }, // Type of discount
    criteria: { type: String, required: false }, // Optional criteria (e.g., first purchase)
    active: { type: Boolean, default: true }, // Is the discount active?
    expiresAt: { type: Date, required: false } // Expiration date
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);
