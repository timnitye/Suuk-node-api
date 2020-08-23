const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderItem = require('order-item');

const orderSchema = new Schema({
  orderItems: {
    type: [OrderItem],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  taxesAndFees: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', orderSchema);