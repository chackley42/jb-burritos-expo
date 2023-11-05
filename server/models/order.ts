const mongoose = require('mongoose');

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
  status: {
    type: String,
    enum: ['order received and is being prepared', 'ready for pickup'],
    default: 'order received and is being prepared', // Default value if not provided
  },
},{timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
