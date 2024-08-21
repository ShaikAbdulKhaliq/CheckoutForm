// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    minlength: 16,
    maxlength: 16,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
