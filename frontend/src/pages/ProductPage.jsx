import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { resolveImageUrl } from '../utils/imageUrl'

// Image Carousel Component
function ImageCarousel({ images, productName, stock }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className='relative'
    >
      <div className='relative overflow-hidden rounded-2xl shadow-lg'>
        <motion.img
          key={currentIndex}
          src={resolveImageUrl(images[currentIndex]) || 'https://via.placeholder.com/600x400'}
          alt={`${productName} - ảnh ${currentIndex + 1}`}
          className='w-full h-96 object-cover'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Navigation Arrows (if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#704214] rounded-full p-2 shadow-md transition'
              aria-label='Previous image'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#704214] rounded-full p-2 shadow-md transition'
              aria-label='Next image'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className='flex justify-center gap-2 mt-4'>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${idx === currentIndex ? 'bg-[#704214] scale-125' : 'bg-gray-300'
                }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Stock Badge */}
      {stock > 0 && (
        <div className='absolute top-4 right-4 bg-[#A8E6CF] text-[#225544] px-4 py-2 rounded-full font-semibold text-sm shadow-md'>
          Còn {stock} sản phẩm
        </div>
      )}
    </motion.div>
  );
}


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
            <Link to='/products' className='hover:underline'>Sản phẩm</Link>
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
              {/* Image Carousel Section */}
              <ImageCarousel images={Array.isArray(p.img) ? p.img : [p.img]} productName={p.name} stock={p.stock} />

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

                {/* Facebook contact option */}
                <div className='mt-4 p-4 bg-[#e7f0fd] rounded-2xl border border-[#b3c9f7]'>
                  <p className='text-sm text-[#1e3a5f] font-medium mb-3 text-center'>
                    Không muốn mua qua web? Liên hệ trực tiếp!
                  </p>
                  <a
                    href='https://www.facebook.com/profile.php?id=61587336933677'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center gap-2 w-full py-3 bg-[#4267B2] text-white rounded-xl font-semibold hover:bg-[#5b7bd5] transition shadow-md'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                    </svg>
                    Đặt hàng qua Facebook
                  </a>
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
              to='/products'
              className='inline-block px-6 py-3 bg-gradient-to-r from-[#A8E6CF] to-[#8FD9B6] text-[#225544] rounded-2xl font-semibold shadow-md hover:shadow-lg transition'
            >
              ← Quay lại trang sản phẩm
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}
