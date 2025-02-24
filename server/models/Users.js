const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    userId:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    phoneNumber:{type:Number, required:true, unique:true},
    password:{type:String, required:true},
    isTemporaryPassword:{type: Boolean, default: false},
    numberOfOrders:{type:Number, required:true, default:0},
    createdAt:{type:Date, default:Date.now}
});


// hashing passwords before saving

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
module.exports = mongoose.model('Users', userSchema)