const mongoose = require('mongoose');

const orderSchema =  new mongoose.Schema({
    orderId: {type: String, required: true, unique:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    orderItems:[{
        product: {type:mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        name:{type: String, required: true},
        image:{type:String, required: true},
        quantity:{type: Number, required: true, min: 1},
        price:{type: Number, required: true}

    }],
    totalPrice: {
        type: Number, 
        required: true
    },
    discountApplied: {type: Number, default: 0},
    paymentMethod: {type: String, required: true},
    shippingAddress: {
        address: {type:String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    isPaid: {type: Boolean, default: false},
    isDelivered: {type: Boolean, default: false},
    paidAt : {type: Date},
    deliveredAt: {type: Date},
    createdAt:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema)