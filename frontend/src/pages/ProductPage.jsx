import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export default function ProductPage() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { addToCart } = useOutletContext();

  useEffect(() => { api.get(`/products/${id}`).then(r => setP(r.data)).catch(() => { }) }, [id])

  if (!p) return (
    <div className='min-h-screen flex items-center justify-center'>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className='w-12 h-12 border-4 border-[#704214] border-t-transparent rounded-full'
      />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>{p.name} — Grella</title>
        <meta name="description" content={p.desc} />
      </Helmet>

      <div className='min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] py-8 px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-6 text-sm text-[#704214]'
          >
            <Link to='/' className='hover:underline'>Trang chủ</Link>
            <span className='mx-2'>/</span>
            <span>{p.name}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-3xl shadow-2xl overflow-hidden'
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-8'>
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='relative'
              >
                <motion.img
                  src={p.img || 'https://via.placeholder.com/600x400'}
                  alt={p.name}
                  className='w-full h-96 object-cover rounded-2xl shadow-lg'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                {p.stock > 0 && (
                  <div className='absolute top-4 right-4 bg-[#A8E6CF] text-[#225544] px-4 py-2 rounded-full font-semibold text-sm shadow-md'>
                    Còn {p.stock} sản phẩm
                  </div>
                )}
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='flex flex-col'
              >
                {p.category && (
                  <span className='inline-block px-3 py-1 bg-[#FFE5B4] text-[#704214] rounded-full text-xs font-semibold mb-3 w-fit'>
                    {p.category}
                  </span>
                )}

                <h1 className='text-4xl font-bold text-[#704214] mb-3'>{p.name}</h1>

                <div className='flex items-baseline gap-3 mb-6'>
                  <div className='text-3xl font-bold text-[#2E7D32]'>
                    {p.price.toLocaleString('vi-VN')}₫
                  </div>
                  {p.age && (
                    <span className='text-sm text-gray-600'>Độ tuổi: {p.age}</span>
                  )}
                </div>

                <p className='text-gray-700 leading-relaxed mb-6'>{p.desc}</p>

                {/* Features */}
                {p.features && p.features.length > 0 && (
                  <div className='mb-6'>
                    <h3 className='font-semibold text-[#704214] mb-3'>Đặc điểm nổi bật:</h3>
                    <ul className='space-y-2'>
                      {p.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className='flex items-start gap-2 text-gray-700'
                        >
                          <span className='text-[#A8E6CF] mt-1'>●</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({ id: p._id, name: p.name, price: p.price, img: p.img })}
                  className='w-full py-4 bg-gradient-to-r from-[#A8E6CF] to-[#8FD9B6] text-[#225544] rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow'
                >
                  Thêm vào giỏ hàng
                </motion.button>

                {/* Additional Info */}
                <div className='mt-6 p-4 bg-[#FFF9E6] rounded-xl'>
                  <h4 className='font-semibold text-[#704214] mb-2'>🌱 Cam kết của Grella:</h4>
                  <ul className='text-sm text-gray-700 space-y-1'>
                    <li>✓ Làm từ bã cà phê tái chế</li>
                    <li>✓ An toàn, không hóa chất độc hại</li>
                    <li>✓ Phương pháp Montessori</li>
                    <li>✓ Miễn phí vận chuyển đơn trên 500k</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-8 text-center'
          >
            <Link
              to='/'
              className='inline-block px-6 py-3 text-[#704214] hover:text-[#8B5A2B] font-medium transition'
            >
              ← Quay lại trang chủ
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}
