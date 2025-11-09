const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch(err){ res.status(500).json({ error: String(err) }); }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try{
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({message:'Not found'});
    res.json(p);
  }catch(err){ res.status(400).json({ error: String(err) }); }
});

// POST (create)
router.post('/', async (req, res) => {
  try{
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  }catch(err){ res.status(400).json({ error: String(err) }); }
});

// PUT (update)
router.put('/:id', async (req, res) => {
  try{
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  }catch(err){ res.status(400).json({ error: String(err) }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }catch(err){ res.status(400).json({ error: String(err) }); }
});

module.exports = router;
