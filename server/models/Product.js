const mongoose = require('mongoose');

const productSchema =  new mongoose.Schema({
    productId : { type: String, required:true, unique:true},
    productName : {type:String, required:true},
    productImg:{type:[String], required: true},
    description : {type:String, required: true},
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Brand' 
    },
    price: {type:Number, required:true, default:0},
    countInStock: {type:Number, required: true, default:0},
    createdAt:{type:Date,default:Date.now}
     
});

module.exports = mongoose.model('Products',productSchema)