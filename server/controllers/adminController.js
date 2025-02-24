const asyncHandler = require('express-async-handler');
const Admins = require('../models/Admins');

// ✅ Create Admin
exports.createAdmins = asyncHandler(async (req, res) => {
    const { adminId, adminName, lastName, adminEmail, password } = req.body; // ✅ FIXED req.body

    if (!adminId || !adminName || !adminEmail || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const existingAdmin = await Admins.findOne({ adminId }); // ✅ FIXED adminId check
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin with this ID already exists." });
    }

    const newAdmin = new Admins({ adminId, adminName, lastName, adminEmail, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
});

// ✅ Get All Admins
exports.getAllAdmin = asyncHandler(async (req, res) => {
    const admins = await Admins.find();
    res.status(200).json(admins);
});

// ✅ Get Admin by ID
exports.getAdminById = asyncHandler(async (req, res) => {
    const admin = await Admins.findOne({ adminId: req.params.adminId });
    if (!admin) {
        res.status(404);
        throw new Error("Admin not found. Please check the adminId.");
    }
    res.status(200).json(admin);
});

// ✅ Update Admin
exports.updateAdmin = asyncHandler(async (req, res) => {
    const admin = await Admins.findOne({ adminId: req.params.adminId });
    if (!admin) {
        res.status(404);
        throw new Error("Admin not found to update!");
    }

    const { adminName, lastName, adminEmail, password } = req.body;

    admin.adminName = adminName || admin.adminName;
    admin.lastName = lastName || admin.lastName;
    admin.adminEmail = adminEmail || admin.adminEmail;
    admin.password = password || admin.password; // ✅ FIXED password update

    const updatedAdmin = await admin.save();
    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
});

// ✅ Delete Admin
exports.deleteAdmin = asyncHandler(async (req, res) => {
    const admin = await Admins.findOne({ adminId: req.params.adminId });
    if (!admin) {
        res.status(404);
        throw new Error("Admin not found to delete.");
    }
    await admin.deleteOne();
    res.status(200).json({ message: "Admin deleted successfully!" });
});
