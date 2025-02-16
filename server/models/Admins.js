const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId:{type:String, required:true, unique:true},
    adminName:{type:String, required: true},
    lastName:{type:String, required: true},
    adminEmail:{type:String, required:true},
    password:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
})


module.exports = mongoose.model('Admins', adminSchema)