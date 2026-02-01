import React, { useState } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, changeQty, removeFromCart, setCart } = useOutletContext();
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Frontend validation
    if (buyerInfo.name.trim().length < 2) {
      setError('Tên phải có ít nhất 2 ký tự');
      setLoading(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(buyerInfo.phone.replace(/\s/g, ''))) {
      setError('Số điện thoại không hợp lệ (VD: 0123456789)');
      setLoading(false);
      return;
    }

    if (buyerInfo.address.trim().length < 10) {
      setError('Địa chỉ phải có ít nhất 10 ký tự');
      setLoading(false);
      return;
    }

    try {
      const items = cart.map(i => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty
      }));

      const response = await api.post('/orders', {
        buyer: buyerInfo,
        items,
        total
      });

      // Clear cart
      setCart([]);
      localStorage.removeItem('grella_cart');

      alert(`✅ Đặt hàng thành công!\nMã đơn hàng: ${response.data._id.slice(-8).toUpperCase()}`);
      navigate('/profile');
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Giỏ hàng - Grella</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-[#704214] mb-8">Giỏ hàng của bạn</h1>

            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-12 text-center"
              >
                <div className="text-8xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-[#704214] mb-4">Giỏ hàng trống</h2>
                <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <Link
                  to="/products"
                  className="inline-block px-8 py-3 bg-[#A8E6CF] text-[#225544] rounded-full font-semibold hover:bg-[#8FD9B6] transition"
                >
                  🧸 Mua sắm ngay
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-md p-6 flex gap-4"
                    >
                      <img
                        src={item.img || 'https://via.placeholder.com/150'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#704214]">{item.name}</h3>
                        <p className="text-[#2e7d32] font-bold text-xl mt-1">
                          {item.price.toLocaleString('vi-VN')}₫
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => changeQty(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition"
                            >
                              −
                            </button>
                            <span className="w-12 text-center font-semibold">{item.qty}</span>
                            <button
                              onClick={() => changeQty(item.id, +1)}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm"
                          >
                            🗑️ Xóa
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Tổng</p>
                        <p className="text-xl font-bold text-[#2e7d32]">
                          {(item.price * item.qty).toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Checkout Form */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6 sticky top-4"
                  >
                    <h2 className="text-xl font-bold text-[#704214] mb-4">Thông tin đặt hàng</h2>

                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#704214] mb-2">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          required
                          value={buyerInfo.name}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#704214] mb-2">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          value={buyerInfo.phone}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
                          placeholder="0123456789"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#704214] mb-2">
                          Địa chỉ giao hàng *
                        </label>
                        <textarea
                          required
                          rows="3"
                          value={buyerInfo.address}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
                          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        />
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tạm tính:</span>
                          <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Phí vận chuyển:</span>
                          <span className="font-semibold">
                            {shipping === 0 ? (
                              <span className="text-green-600">Miễn phí</span>
                            ) : (
                              `${shipping.toLocaleString('vi-VN')}₫`
                            )}
                          </span>
                        </div>
                        {subtotal < 500000 && (
                          <p className="text-xs text-gray-500">
                            💡 Mua thêm {(500000 - subtotal).toLocaleString('vi-VN')}₫ để được miễn phí ship
                          </p>
                        )}
                        <div className="flex justify-between text-lg font-bold text-[#704214] pt-2 border-t">
                          <span>Tổng cộng:</span>
                          <span className="text-[#2e7d32]">{total.toLocaleString('vi-VN')}₫</span>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#A8E6CF] text-[#225544] rounded-lg font-bold text-lg hover:bg-[#8FD9B6] transition disabled:opacity-50"
                      >
                        {loading ? '⏳ Đang xử lý...' : '💳 Đặt hàng'}
                      </button>

                      <Link
                        to="/products"
                        className="block text-center text-sm text-[#704214] hover:text-[#8B5A2B] mt-4"
                      >
                        ← Tiếp tục mua sắm
                      </Link>
                    </form>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
