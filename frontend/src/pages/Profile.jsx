import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get user info
    api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => {
        setUser(r.data);
        setEditForm({
          name: r.data.name || '',
          phone: r.data.phone || '',
          address: r.data.address || ''
        });
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      });

    // Get orders
    api.get('/orders')
      .then(r => setOrders(r.data || []))
      .catch(() => setOrders([]));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await api.put('/auth/me', editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setIsEditing(false);
      alert('Cập nhật thông tin thành công!');
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.error || 'Không thể cập nhật'));
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA]'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className='w-12 h-12 border-4 border-[#704214] border-t-transparent rounded-full'
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tài khoản của tôi — Grella</title>
      </Helmet>

      <div className='min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] py-12 px-4'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className='text-4xl font-bold text-[#704214] mb-8'>👤 Tài khoản của tôi</h1>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* User Info Sidebar */}
              <div className='lg:col-span-1'>
                <div className='bg-white rounded-2xl shadow-lg p-6 sticky top-4'>
                  <div className='text-center mb-6'>
                    <div className='w-24 h-24 bg-gradient-to-br from-[#A8E6CF] to-[#8FD9B6] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg'>
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className='text-2xl font-bold text-[#704214]'>{user?.name}</h2>
                    <p className='text-gray-600 text-sm'>{user?.email}</p>
                    <span className='inline-block mt-2 px-3 py-1 bg-[#FFE5B4] text-[#704214] rounded-full text-sm font-semibold'>
                      {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </div>

                  <div className='space-y-3 text-sm mb-6'>
                    <div className='flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg'>
                      <span>📞</span>
                      <span>{user?.phone || 'Chưa cập nhật'}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg'>
                      <span>📍</span>
                      <span className='flex-1'>{user?.address || 'Chưa cập nhật'}</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    {user?.role === 'admin' && (
                      <Link
                        to='/admin'
                        className='block w-full py-3 bg-[#704214] text-white text-center rounded-lg hover:bg-[#8B5A2B] transition font-medium'
                      >
                        👑 Trang Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className='w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium'
                    >
                      🚪 Đăng xuất
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className='lg:col-span-2'>
                {/* Tabs */}
                <div className='bg-white rounded-2xl shadow-lg p-2 mb-6'>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setActiveTab('info')}
                      className={`flex-1 py-3 rounded-xl font-medium transition ${activeTab === 'info' ? 'bg-[#A8E6CF] text-[#225544]' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      📋 Thông tin
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`flex-1 py-3 rounded-xl font-medium transition ${activeTab === 'orders' ? 'bg-[#A8E6CF] text-[#225544]' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      Đơn hàng ({orders.length})
                    </button>
                  </div>
                </div>

                {/* Info Tab */}
                {activeTab === 'info' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white rounded-2xl shadow-lg p-6'
                  >
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-2xl font-bold text-[#704214]'>Thông tin cá nhân</h2>
                      {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className='px-4 py-2 bg-[#A8E6CF] text-[#225544] rounded-lg hover:opacity-90 transition font-medium'
                        >
                          ✏️ Chỉnh sửa
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile} className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-[#704214] mb-2'>Họ và tên</label>
                          <input
                            type='text'
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]'
                            required
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[#704214] mb-2'>Email</label>
                          <input
                            type='email'
                            value={user?.email}
                            disabled
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500'
                          />
                          <p className='text-xs text-gray-500 mt-1'>Email không thể thay đổi</p>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[#704214] mb-2'>Số điện thoại</label>
                          <input
                            type='tel'
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]'
                            placeholder='0123456789'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[#704214] mb-2'>Địa chỉ</label>
                          <textarea
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]'
                            rows='3'
                            placeholder='Nhập địa chỉ của bạn'
                          />
                        </div>
                        <div className='flex gap-3 pt-2'>
                          <button
                            type='submit'
                            className='flex-1 py-3 bg-[#A8E6CF] text-[#225544] rounded-lg hover:opacity-90 transition font-medium'
                          >
                            💾 Lưu thay đổi
                          </button>
                          <button
                            type='button'
                            onClick={() => {
                              setIsEditing(false);
                              setEditForm({
                                name: user?.name || '',
                                phone: user?.phone || '',
                                address: user?.address || ''
                              });
                            }}
                            className='px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium'
                          >
                            ❌ Hủy
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className='space-y-4'>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <p className='text-sm text-gray-600 mb-1'>Họ và tên</p>
                          <p className='font-semibold text-[#704214]'>{user?.name}</p>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <p className='text-sm text-gray-600 mb-1'>Email</p>
                          <p className='font-semibold text-[#704214]'>{user?.email}</p>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <p className='text-sm text-gray-600 mb-1'>Số điện thoại</p>
                          <p className='font-semibold text-[#704214]'>{user?.phone || 'Chưa cập nhật'}</p>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <p className='text-sm text-gray-600 mb-1'>Địa chỉ</p>
                          <p className='font-semibold text-[#704214]'>{user?.address || 'Chưa cập nhật'}</p>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <p className='text-sm text-gray-600 mb-1'>Ngày tạo tài khoản</p>
                          <p className='font-semibold text-[#704214]'>
                            {new Date(user?.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white rounded-2xl shadow-lg p-6'
                  >
                    <h2 className='text-2xl font-bold text-[#704214] mb-6'>Lịch sử đơn hàng</h2>

                    {orders.length === 0 ? (
                      <div className='text-center py-12'>
                        <div className='text-6xl mb-4'>🛒</div>
                        <p className='text-gray-500 mb-4'>Bạn chưa có đơn hàng nào</p>
                        <Link
                          to='/products'
                          className='inline-block px-6 py-3 bg-[#A8E6CF] text-[#225544] rounded-lg font-semibold hover:bg-[#8FD9B6] transition'
                        >
                          🧸 Mua sắm ngay
                        </Link>
                      </div>
                    ) : (
                      <div className='space-y-4'>
                        {orders.map((order) => (
                          <div key={order._id} className='border-2 border-gray-200 rounded-xl p-5 hover:shadow-md transition'>
                            <div className='flex justify-between items-start mb-4'>
                              <div>
                                <p className='font-bold text-[#704214] text-lg'>Đơn hàng #{order._id.slice(-8).toUpperCase()}</p>
                                <p className='text-sm text-gray-600 mt-1'>
                                  📅 {new Date(order.createdAt).toLocaleString('vi-VN')}
                                </p>
                              </div>
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipping' ? 'bg-blue-100 text-blue-700' :
                                  order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                {order.status === 'completed' ? '✅ Hoàn thành' :
                                  order.status === 'shipping' ? 'Đang giao' :
                                    order.status === 'cancelled' ? '❌ Đã hủy' :
                                      '⏳ Chờ xử lý'}
                              </span>
                            </div>

                            {order.items && order.items.length > 0 && (
                              <div className='mb-4 space-y-2'>
                                <p className='text-sm font-medium text-gray-700'>Sản phẩm:</p>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className='flex justify-between text-sm bg-gray-50 p-2 rounded'>
                                    <span>{item.name} x {item.qty}</span>
                                    <span className='font-medium'>{((item.price || 0) * item.qty).toLocaleString('vi-VN')}₫</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className='flex justify-between items-center pt-3 border-t'>
                              <span className='text-gray-600'>Tổng cộng:</span>
                              <span className='text-2xl font-bold text-[#2E7D32]'>
                                {(order.total || 0).toLocaleString('vi-VN')}₫
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <div className='mt-8 text-center'>
              <Link to='/' className='text-[#704214] hover:text-[#8B5A2B] font-medium'>
                ← Quay lại trang chủ
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
