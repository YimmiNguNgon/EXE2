const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  buyer: { name: String, phone: String, address: String },
  items: [{ productId: String, name: String, price: Number, qty: Number }],
  total: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('Order', OrderSchema);
