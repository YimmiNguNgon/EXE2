import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${slug}`)
      .then(r => {
        setBlog(r.data);
        setLoading(false);
      })
      .catch(() => {
        setBlog(null);
        setLoading(false);
      });
  }, [slug]);

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

  if (!blog) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA]'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-[#704214] mb-4'>Không tìm thấy bài viết</h1>
          <Link to='/blog' className='text-[#A8E6CF] hover:underline'>← Quay lại Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} — Grella Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <div className='min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] py-8 px-4'>
        <article className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-6 text-sm text-[#704214]'
          >
            <Link to='/' className='hover:underline'>Trang chủ</Link>
            <span className='mx-2'>/</span>
            <Link to='/blog' className='hover:underline'>Blog</Link>
            <span className='mx-2'>/</span>
            <span>{blog.title}</span>
          </motion.div>

          {/* Article Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-3xl shadow-2xl overflow-hidden'
          >
            {/* Featured Image */}
            {blog.image && (
              <div className='relative h-96 bg-gradient-to-br from-[#FFE5B4] to-[#FFF5B1] overflow-hidden'>
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className='w-full h-full object-cover'
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}

            {/* Content */}
            <div className='p-8 md:p-12'>
              {/* Meta */}
              <div className='flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600'>
                {blog.category && (
                  <span className='px-3 py-1 bg-[#FFE5B4] text-[#704214] rounded-full font-semibold'>
                    {blog.category}
                  </span>
                )}
                <span>📖 {blog.readTime} phút đọc</span>
                <span>✍️ {blog.author}</span>
                <span>📅 {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>

              {/* Title */}
              <h1 className='text-4xl md:text-5xl font-bold text-[#704214] mb-6'>
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className='text-xl text-gray-700 mb-8 pb-8 border-b-2 border-gray-200'>
                {blog.excerpt}
              </p>

              {/* Content */}
              <div 
                className='prose prose-lg max-w-none
                  prose-headings:text-[#704214] 
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-gray-700 prose-li:mb-2
                  prose-strong:text-[#704214] prose-strong:font-semibold
                  prose-a:text-[#A8E6CF] prose-a:no-underline hover:prose-a:underline'
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className='mt-12 pt-8 border-t-2 border-gray-200'>
                  <h3 className='text-sm font-semibold text-gray-600 mb-3'>Tags:</h3>
                  <div className='flex flex-wrap gap-2'>
                    {blog.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className='px-3 py-1 bg-[#E8FBEA] text-[#2E7D32] rounded-full text-sm'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-8 flex justify-between items-center'
          >
            <Link 
              to='/blog' 
              className='inline-block px-6 py-3 text-[#704214] hover:text-[#8B5A2B] font-medium transition'
            >
              ← Tất cả bài viết
            </Link>
            <Link 
              to='/' 
              className='inline-block px-6 py-3 text-[#704214] hover:text-[#8B5A2B] font-medium transition'
            >
              Trang chủ →
            </Link>
          </motion.div>
        </article>
      </div>
    </>
  );
}
