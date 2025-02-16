const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandId: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    brandName: {
        type: String,
        required: true,
        unique: true, // Ensure brand names are unique
    },
    logo: {
        type: String, // Single URL for the logo (unless you need multiple logos)
        required: true,
    },
    description: {
        type: String, // Optional description for the brand
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically record when the brand was created
    },
});

// Create the Brand model
const Brand = mongoose.model('Brand', brandSchema);

// Export the Brand model
module.exports = Brand;
