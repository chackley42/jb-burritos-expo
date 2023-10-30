// Order.js
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
  orderID: String,
  phoneNumber: String,
  subtotal: String,
  tax: String,
  total: String,
  items: [
    {
      id: String,
      name: String,
      price: String,
      quantity: String,
    },
  ],
  username: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
