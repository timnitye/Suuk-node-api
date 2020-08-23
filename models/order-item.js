const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('product');

const orderItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    Product: {
        type: Product,
        required: true
    }

});

module.exports = mongoose.model('OrderItem', orderItemSchema);