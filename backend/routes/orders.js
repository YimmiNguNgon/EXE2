const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try{
    const { buyer, items, total } = req.body;
    
    // Validation
    if(!buyer || !items || items.length === 0) {
      return res.status(400).json({ error: 'Thông tin đơn hàng không hợp lệ' });
    }
    
    // Validate buyer info
    if(!buyer.name || !buyer.phone || !buyer.address) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin người mua' });
    }
    
    if(buyer.name.trim().length < 2) {
      return res.status(400).json({ error: 'Tên phải có ít nhất 2 ký tự' });
    }
    
    // Phone validation (Vietnamese phone format)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if(!phoneRegex.test(buyer.phone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
    }
    
    if(buyer.address.trim().length < 10) {
      return res.status(400).json({ error: 'Địa chỉ phải có ít nhất 10 ký tự' });
    }
    
    // Validate items
    for(const item of items) {
      if(!item.productId || !item.name || !item.price || !item.qty) {
        return res.status(400).json({ error: 'Thông tin sản phẩm không hợp lệ' });
      }
      if(item.price <= 0 || item.qty <= 0) {
        return res.status(400).json({ error: 'Giá và số lượng phải lớn hơn 0' });
      }
    }
    
    // Validate total
    if(!total || total <= 0) {
      return res.status(400).json({ error: 'Tổng tiền không hợp lệ' });
    }
    
    const order = new Order({ buyer, items, total });
    await order.save();
    res.status(201).json(order);
  }catch(err){ res.status(500).json({ error: String(err) }); }
});

// List orders (admin)
router.get('/', async (req, res) => {
  try{
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  }catch(err){ res.status(500).json({ error: String(err) }); }
});

// Update order status (admin)
router.put('/:id', async (req, res) => {
  try{
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if(!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    res.json(order);
  }catch(err){ res.status(500).json({ error: String(err) }); }
});

// Delete order (admin)
router.delete('/:id', async (req, res) => {
  try{
    const order = await Order.findByIdAndDelete(req.params.id);
    if(!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    res.json({ message: 'Đã xóa đơn hàng' });
  }catch(err){ res.status(500).json({ error: String(err) }); }
});

module.exports = router;
