const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure emails are stored in lowercase
        trim: true, // Remove any extra spaces
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'], // Validate email format
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Enforce minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically record when the admin was created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically record when the admin was last updated
    },
});

// Middleware to hash the password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

// Export the Admin model
module.exports = Admin;