import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function Register() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const setUser = context?.setUser;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ tên');
      return;
    }

    if (formData.name.trim().length < 2) {
      setError('Họ tên phải có ít nhất 2 ký tự');
      return;
    }

    if (!formData.email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      
      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Update user state in App if setUser is available
        if (setUser) {
          setUser(response.data.user);
        }
        
        setSuccess('Đăng ký thành công! Đang chuyển hướng...');
        
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        setError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.error || err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng ký — Grella</title>
      </Helmet>

      <div className='min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] flex items-center justify-center py-12 px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md'
        >
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-[#704214] mb-2'>Đăng ký</h1>
            <p className='text-gray-600'>Tạo tài khoản Grella của bạn</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4'
            >
              ❌ {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4'
            >
              ✅ {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold text-[#704214] mb-2'>
                Họ tên
              </label>
              <input
                type='text'
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A8E6CF] focus:outline-none transition'
                placeholder='Nguyễn Văn A'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-[#704214] mb-2'>
                Email
              </label>
              <input
                type='email'
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A8E6CF] focus:outline-none transition'
                placeholder='your@email.com'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-[#704214] mb-2'>
                Mật khẩu
              </label>
              <input
                type='password'
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A8E6CF] focus:outline-none transition'
                placeholder='••••••••'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-[#704214] mb-2'>
                Xác nhận mật khẩu
              </label>
              <input
                type='password'
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A8E6CF] focus:outline-none transition'
                placeholder='••••••••'
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              disabled={loading}
              className='w-full py-3 bg-gradient-to-r from-[#A8E6CF] to-[#8FD9B6] text-[#225544] rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50'
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </motion.button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Đã có tài khoản?{' '}
              <Link to='/login' className='text-[#A8E6CF] hover:text-[#8FD9B6] font-semibold'>
                Đăng nhập
              </Link>
            </p>
          </div>

          <div className='mt-6 text-center'>
            <Link to='/' className='text-sm text-gray-600 hover:text-[#704214]'>
              ← Quay lại trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
