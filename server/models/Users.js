const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userId:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    phoneNumber:{type:Number, required:true, unique:true},
    password:{type:String, required:true},
    numberOfOrders:{type:Number, required:true, default:0},
    createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Users', userSchema)