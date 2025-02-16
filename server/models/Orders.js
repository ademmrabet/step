const mongoose = require('mongoose');
const Users = require('./Users');

const orderItemSchema = new mongoose.Schema({
    name:{type:String, required:true},
    quantity:{type:Number, required:true},
    image:{type:String, required:true},
    price:{type: Number, required: true},
    product: {type:mongoose.Schema.Types.ObjectId, ref:'Products', required:true}
});

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'Users'},
    orderItems: [orderItemSchema],
    shippingAddress: {
        address:{type:String, required: true},
        city:{type:String, required: true},
        province:{type:String, required:true}
    },
    paymentMethod: {type:String, required: true, default: 'Cash'},
    paymentResult:{
        id:{type:String},
        status:{type:String},
        updatedTime:{type:String},
        emailAddress:{type:String}
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.000,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.000
    },
    isPaid: {
        type:Boolean,
        required:true,
        default:false,
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default: false,
    },
    deliveredAt:{
        type: Date,
    }

}, {timestamps:true});


module.exports = mongoose.model('Orders', orderSchema)