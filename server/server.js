const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');


dotenv.config();
const app = express();

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