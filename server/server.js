const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');


dotenv.config();
const app = express();

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

//middleware
app.use(cors());
app.use(express.json());

//Default route
app.get('/', (req, res) => {
    res.send('Step Footwear API is running');
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});