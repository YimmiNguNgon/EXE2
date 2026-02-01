import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs')
      .then(r => {
        setBlogs(r.data || []);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA]'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className='w-12 h-12 border-4 border-[#1e3a5f] border-t-transparent rounded-full'
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog — DearHim | Tư vấn tặng quà & Hộp quà cá nhân hóa</title>
        <meta name="description" content="Khám phá các bài viết về cách tặng quà ý nghĩa, ý tưởng hộp quà, và nhiều hơn nữa." />
      </Helmet>

      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-12'
          >
            <h1 className='text-4xl sm:text-5xl font-bold text-[#1e3a5f] mb-4'>
              Bài viết nổi bật
            </h1>
            <p className='text-lg text-[#2c5f8d] max-w-2xl mx-auto'>
              Tư vấn tặng quà, ý tưởng hộp quà, cách làm quà ý nghĩa.
            </p>
          </motion.div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className='text-center py-20'>
              <p className='text-gray-500'>Chưa có bài viết nào. Hãy chạy seed data!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {blogs.map((blog, idx) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)" }}
                  className='bg-white rounded-2xl overflow-hidden shadow-lg'
                >
                  <Link to={`/blog/${blog.slug}`}>
                    <div className='relative h-48 bg-gradient-to-br from-[#FFE5B4] to-[#FFF5B1] overflow-hidden'>
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className='w-full h-full object-cover'
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center text-6xl'>
                          📝
                        </div>
                      )}
                      {blog.category && (
                        <span className='absolute top-4 left-4 px-3 py-1 bg-white/90 text-[#1e3a5f] rounded-full text-xs font-semibold'>
                          {blog.category}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className='p-6'>
                    <Link to={`/blog/${blog.slug}`}>
                      <h2 className='text-xl font-bold text-[#1e3a5f] mb-3 hover:text-[#2c5f8d] transition line-clamp-2'>
                        {blog.title}
                      </h2>
                    </Link>

                    <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                      {blog.excerpt}
                    </p>

                    <div className='flex items-center justify-between text-xs text-gray-500 mb-4'>
                      <span>📖 {blog.readTime} phút đọc</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className='inline-block text-sm text-[#d4af37] hover:text-[#c19b2f] font-semibold transition'
                    >
                      Xem thêm →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-12 text-center'
          >
            <Link
              to='/'
              className='inline-block px-6 py-3 text-[#1e3a5f] hover:text-[#2c5f8d] font-medium transition'
            >
              ← Quay lại trang chủ
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
