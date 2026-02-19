const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

// POST /api/wishes - Create a new wish
router.post('/', async (req, res) => {
    try {
        const { message, category, creatorName } = req.body;

        // Validate required fields
        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Create new wish
        const wish = new Wish({
            message: message.trim(),
            category: category || 'general',
            creatorName: creatorName || 'DearHim',
            author: creatorName || 'DearHim',
            isActive: true
        });

        await wish.save();
        res.status(201).json(wish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/wishes/:id/qrcode - Generate QR code for a wish
router.get('/:id/qrcode', async (req, res) => {
    try {
        const wish = await Wish.findById(req.params.id);
        if (!wish) {
            return res.status(404).json({ error: 'Wish not found' });
        }

        // Generate QR code URL using request origin (works for both local and production)
        const origin = req.get('origin') || req.get('referer')?.replace(/\/$/, '') || 'http://localhost:5173';
        const wishUrl = `${origin}/wish/${wish._id}`;

        // Generate QR code as base64 data URL (no filesystem needed - works on Render)
        const qrDataUrl = await QRCode.toDataURL(wishUrl, {
            color: {
                dark: '#1e3a5f',  // DearHim blue
                light: '#FFFFFF'
            },
            width: 400
        });

        res.json({
            qrCodeUrl: qrDataUrl,   // base64 data URL, usable directly as <img src>
            wishUrl: wishUrl,
            wishId: wish._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/wishes/random - Get a random wish
router.get('/random', async (req, res) => {
    try {
        const count = await Wish.countDocuments({ isActive: true });
        if (count === 0) {
            return res.status(404).json({ error: 'No wishes found' });
        }

        const random = Math.floor(Math.random() * count);
        const wish = await Wish.findOne({ isActive: true }).skip(random);

        res.json(wish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/wishes/:id - Get specific wish by ID
router.get('/:id', async (req, res) => {
    try {
        const wish = await Wish.findById(req.params.id);
        if (!wish) {
            return res.status(404).json({ error: 'Wish not found' });
        }
        res.json(wish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/wishes - Get all wishes (for testing)
router.get('/', async (req, res) => {
    try {
        const wishes = await Wish.find({ isActive: true });
        res.json(wishes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
