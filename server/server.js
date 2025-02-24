const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path')

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const discountRoutes = require('./routes/discountRoutes');
const brandRoutes = require('./routes/brandRoutes');
const orderRoutes = require('./routes/orderRoutes')


dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route that throws an error
app.get('/error', (req, res, next) => {
    try {
        throw new Error('This is a test error');
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

//Connect to MongoDB
connectDB();


//Database routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/orders', orderRoutes);

//Server static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Default route
app.get('/', (req, res) => {
    res.send('Step Footwear API is running');
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});