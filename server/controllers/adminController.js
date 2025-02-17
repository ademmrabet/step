const asyncHandler = require('express-async-handler');
const Admins = require('../models/Admins');

exports.createAdmin = asyncHandler(async(req, res) => {
    const {adminId,adminName,lastName,adminEmail,password} = res.body;
    const existingAdmin = await Admins.findOne({userId: req.params.userId});
    if (existingAdmin) {
        res.status(400);
        throw new Error("Admin with this id already exists");
    }
    const newAdmin = new Admins({adminId,adminName,lastName,adminEmail,password});
    await newAdmin.save();

    res.status(201).json({message: "Admin created successfully", admin: newAdmin})
});

exports.getAllAdmin = asyncHandler(async(req, res) => {
    const admins = await Admins.find();
    res.status(200).json(admins)
});

exports.getAdminById = asyncHandler(async(req, res)=>{
    const admin = await Admins.findOne({adminId: req.params.adminId});
    if (!admin) {
        res.status(404);
        throw new Error('Admin not found please Check the adminId');
    }
    res.status(200).json(admin)
});

exports.updateAdmin = asyncHandler(async(req,res)=>{
    const admin = await Admins.findOne({adminId: req.params.adminId});
    if(!admin) {
        res.status(404)
        throw new Error("Admin not Found to update!");
    }
    const {adminId,adminName,lastName,adminEmail,password} = req.body;

    admin.adminId = adminId || admin.adminId;
    admin.adminName = adminName || admin.adminName;
    admin.lastName = lastName || admin.lastName;
    admin.adminEmail = adminEmail || admin.adminEmail;
    admin.password = password || password;

    const updatedAdmin = await admin.save();
    res.status(200).json({message: "admin Updated Successfully", admin: updatedAdmin});
});

exports.deleteAdmin = asyncHandler(async(req, res) => {
    const admin = await Admins.findOne({adminId:req.params.adminId});
    if (!admin) {
        res.status(404);
        throw new Error("User not found to delete");
    }
    await admin.deleteOne();
    res.status(200).json({message:"User deleted successfully!"});
});