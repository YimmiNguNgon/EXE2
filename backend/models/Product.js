const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  age: { type: String },
  stock: { type: Number, default: 0 },
  img: [{ type: String }],
  desc: { type: String },
  features: [{ type: String }],
  category: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
