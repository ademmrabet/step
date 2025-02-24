const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Export the model
module.exports = mongoose.model('Brand', brandSchema);
