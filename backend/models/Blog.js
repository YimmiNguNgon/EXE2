const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  author: { type: String, default: 'Grella Team' },
  readTime: { type: Number, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
