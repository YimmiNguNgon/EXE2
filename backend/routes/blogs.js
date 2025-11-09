const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// GET all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create blog (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update blog (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE blog (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Đã xóa blog thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
