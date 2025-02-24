const asyncHandler = require('express-async-handler');
const Order = require('../models/Orders');
const Product = require('../models/Product');
const User = require('../models/Users');
const sendEmail = require('../utils/mailer');
const receiptEmailTemplate = require('../utils/templates/receiptEmail');
const tempPasswordEmailTemplate = require('../utils/templates/tempPasswordEmail');
const bcrypt = require('bcryptjs')

//Function to generate a random orderId = 6 digits
const generateOrderId = () => Math.floor(100000 + Math.random() * 900000).toString();

//Function to generate a temp password
const generateTempPassword = () => Math.random().toString(36).slice(-8);
//Create Order Crud
exports.createOrder = asyncHandler(async(req, res) => {
    let {name, email, phoneNumber, orderItems, totalPrice, PaymentMethod, shippingAddress} = req.body;

    let user = await User.findOne({phoneNumber});

    let tempPassword = null;
    if(!user) {
        tempPassword = generateTempPassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        user = new User({name, lastName, email, phoneNumber, password: hashedPassword, isTemporaryPassword: true});
        await user.save();
    }
    let validOrderItems = [];
    let calculatedTotalPrice = 0;
    for(const item of orderItems) {
        const product = await Product.findOne({_id: item.product});

        if(!product) {
            res.status(400);
            throw new Error(`Product ${item.name} not found.`);
        }
        if (item.quantity > product.countInStock) {
            res.status(400);
            throw new Error(`Not Enough stock for ${item.name}`);
        }
        validOrderItems.push({
            product: product._id,
            name: product.productName,
            image: product.productImg[0],
            quantity: item.quantity,
            price: product.price
        });
        calculatedTotalPrice += item.quantity * product.price;
    }

    const orderId = generateOrderId();
    const newOrder = new Order({
        orderId,
        user: user._id,
        orderItems: validOrderItems,
        totalPrice: calculatedTotalPrice,
        paymentMethod,
        shippingAddress
    });

    await newOrder.save();

    const emailContent = receiptEmailTemplate({
        userName: user.name,
        orderId,
        orderItems: validOrderItems,
        totalPrice: calculatedTotalPrice
    });

    await sendEmail (user.email, "Your Order Receipt", emailContent);

    if (tempPassword) {
        const emailContent = tempPasswordEmailTemplate({userName: user.name, tempPassword});
        await sendEmail(user.email, "Your Temporary Password", emailContent);
    }

    res.status(201).json({message: "Order created successfully", order: newOrder});
});


//GET ALL ORDERS CRUD
exports.getAllOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
})

//GET ORDERS BY ID
exports.getOrderById =  asyncHandler(async(req, res) => {
    const order = await Order.findOne({orderId:req.params.orderId}).populate('user', 'name email');
    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    }
    res.status(200).json(order);
});

//UPDATE ORDERS CRUD
exports.updateOrderStatus = asyncHandler (async(req, res) => {
    const order = await Order.findOne({orderId : req.params.orderId});

    if(!order) {
        res.status(404);
        throw new Error("Order not found.");
    }
    const {isPaid, isDelivered} = req.body;
    order.isPaid = isPaid !== undefined ? isPaid : order.isPaid;
    order.isDelivered = isDelivered !== undefined ? isDelivered : order.isDelivered;

    if (isDelivered) {
        order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    res.status(200).json({message: "Order updated successfully", order: updatedOrder});
});

//Delete ORDER
exports.deleteOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findOne({orderId:req.params.orderId});

    if(!order) {
        res.status(404);
        throw new Error("Order not found.");
    }

    await order.deleteOne();
    res.status(200).json({message: "Order deleted successfully" });
});