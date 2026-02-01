const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        default: 'DearHim'
    },
    creatorName: {
        type: String,
        default: 'DearHim'
    },
    category: {
        type: String,
        enum: ['birthday', 'love', 'thanks', 'father', 'anniversary', 'general'],
        default: 'general'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Wish', WishSchema);
