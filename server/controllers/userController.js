const Product = require('../models/Product');
const Users = require('../models/Users');
const  asyncHandler = require('express-async-handler');



const generatedUserId = (name, lastName) => {
    const letters = lastName.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 2) + name.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 2);
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return letters + numbers;
};
//READ
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await Users.find();
    res.status(200).json(users)
});

exports.getUserById = asyncHandler(async (req, res) => {
    const user = await Users.findOne({userId:req.params.userId});
    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }
    res.status(200).json(user)
});

//CREATE
exports.createUser = asyncHandler(async (req, res) => {
   const {name, lastName,email,phoneNumber,password,numberOfOrders} = res.body;
   const existingUser = await Users.findOne({phoneNumber});
   if (existingUser) {
    res.status(400);
    throw new Error("User with this phone number already exists.");
   }
   const userId = generatedUserId(name, lastName);
   const newUser = new Users({ userId,name, lastName,email,phoneNumber,password,numberOfOrders});
   await newUser.save();

   res.status(201).json({message: "User created successfully", user: newUser});
});

//UPDATE
exports.updateUser = asyncHandler(async (req, res) => {
    const user = await Users.findOne({userId: req.params.userId});
    if(!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    const {name, lastName,email,phoneNumber,password} = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.lastName= lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = password || user.password;

    const updatedUser = await user.save();
    res.status(200).json({message: "User updated successfully", user: updatedUser});
});

//Delete
exports.deleteUserById = asyncHandler(async (req, res) => {
    const user = await user.findOne({userId: res.params.userId});
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    await user.deleteOne();
    res.status(200).json({message:'User deleted Successfully!'});
});


