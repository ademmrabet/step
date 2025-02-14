const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true
    },
    // Array of sizes with stock information
    sizes: [{
        size: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0, // Default stock is 0
        },
    }],
    price:{
        type: Number,
        required: true
    },
    // Reference to the brand (e.g., "Nike")
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand', // Reference to a "Brand" collection
        required: true,
    },
     // Optional discount percentage (e.g., 10% off)
     discount: {
        type: Number,
        default: 0, // No discount by default
    },
     // Array of color variations
     colors: {
        type: [String],
        required: true,
    },
    // Additional attributes: gender
    attributes: {
        gender: String, // e.g., "Men", "Women", "Unisex"
    },
    // Timestamp for when the product was created
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Add a method to check if a specific size is in stock
productSchema.methods.isSizeInStock = function (size) {
    const sizeEntry = this.sizes.find(s => s.size === size);
    return sizeEntry ? sizeEntry.stock > 0 : false;
};
// Add a method to calculate the discounted price
productSchema.methods.getDiscountedPrice = function () {
    return this.price * (1 - this.discount / 100);
};
// Add a static method to find products by brand
productSchema.statics.findByBrand = function (brandId) {
    return this.find({ brand: brandId });
};
// Add a static method to find products that are out of stock
productSchema.statics.findOutOfStock = function () {
    return this.find({ 'sizes.stock': 0 });
};

// Create the Product model
const Product = mongoose.model('Product', productSchema);
// Export the Product model
module.exports = Product;

