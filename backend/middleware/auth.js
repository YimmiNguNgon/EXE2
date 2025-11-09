const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'grella-secret-key-2024';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Không có token xác thực' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token không hợp lệ' });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Bạn không có quyền truy cập' });
  }
  next();
};

module.exports = { authenticateToken, requireAdmin };
