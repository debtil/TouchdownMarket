const mongoose = require('mongoose');

const orderSchema = new mongoose.orderSchema({
    userId: {type: String, require: true},
    customerId: {type: String},
    paymentIntentId: {type: String},
    products: [
        {
            id: {type: String},
            name: {type: String},
            description: {type: String},
            price: {type: String},
            quantity: {type: Number},
            images: {type: String},
        },
    ],
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    shipping: {type: Object, required: true},
    delivery_status: {type: String, default: "pending"},
    payment_status: {type: String, required: true},
}, 
{timestmaps: true});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
