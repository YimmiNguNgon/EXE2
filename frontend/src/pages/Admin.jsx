import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import api from '../api'

export default function Admin(){
  const navigate = useNavigate()
  const { user } = useOutletContext()
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, blogs: 0 })
  const [products, setProducts] = useState([])
  const [productForm, setProductForm] = useState({ name: '', price: '', img: '', desc: '', age: '', stock: '', category: '' })
  const [editingProduct, setEditingProduct] = useState(null)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '', category: '', tags: '', author: 'Grella Team', readTime: 5 })
  const [editingBlog, setEditingBlog] = useState(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      alert('Bạn không có quyền truy cập!')
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    if (user?.role === 'admin') {
      loadProducts()
      loadOrders()
      loadUsers()
      loadBlogs()
    }
  }, [user])

  useEffect(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    setStats({
      products: products.length,
      orders: orders.length,
      users: users.length,
      revenue: totalRevenue,
      blogs: blogs.length
    })
  }, [products, orders, users, blogs])

  function loadProducts() {
    api.get('/products').then(r => setProducts(r.data || [])).catch(() => {})
  }

  function loadOrders() {
    api.get('/orders').then(r => setOrders(r.data || [])).catch(() => {})
  }

  function loadUsers() {
    api.get('/auth/users').then(r => setUsers(r.data || [])).catch(() => {})
  }

  function loadBlogs() {
    api.get('/blogs').then(r => setBlogs(r.data || [])).catch(() => {})
  }

  function submitProduct(e) {
    e.preventDefault()
    const payload = { 
      ...productForm, 
      price: Number(productForm.price),
      stock: Number(productForm.stock) || 0
    }
    if (editingProduct) {
      api.put(`/products/${editingProduct._id}`, payload).then(() => {
        loadProducts()
        resetProductForm()
      })
    } else {
      api.post('/products', payload).then(() => {
        loadProducts()
        resetProductForm()
      })
    }
  }

  function editProduct(p) {
    setEditingProduct(p)
    setProductForm({
      name: p.name,
      price: p.price,
      img: p.img || '',
      desc: p.desc || '',
      age: p.age || '',
      stock: p.stock || 0,
      category: p.category || ''
    })
  }

  function deleteProduct(id) {
    if (confirm('Xóa sản phẩm?')) {
      api.delete(`/products/${id}`).then(() => loadProducts())
    }
  }

  function resetProductForm() {
    setEditingProduct(null)
    setProductForm({ name: '', price: '', img: '', desc: '', age: '', stock: '', category: '' })
  }

  function updateOrderStatus(orderId, newStatus) {
    api.put(`/orders/${orderId}`, { status: newStatus }).then(() => loadOrders())
  }

  function deleteOrder(id) {
    if (confirm('Xóa đơn hàng?')) {
      api.delete(`/orders/${id}`).then(() => loadOrders())
    }
  }

  function deleteUser(id) {
    if (confirm('Xóa người dùng?')) {
      api.delete(`/auth/users/${id}`).then(() => loadUsers())
    }
  }

  function toggleUserRole(userId, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    if (confirm(`Chuyển thành ${newRole}?`)) {
      api.put(`/auth/users/${userId}`, { role: newRole }).then(() => loadUsers())
    }
  }

  function submitBlog(e) {
    e.preventDefault()
    const payload = {
      ...blogForm,
      tags: blogForm.tags ? blogForm.tags.split(',').map(t => t.trim()) : [],
      readTime: Number(blogForm.readTime) || 5
    }
    if (editingBlog) {
      api.put(`/blogs/${editingBlog._id}`, payload).then(() => {
        loadBlogs()
        resetBlogForm()
        alert('✅ Đã cập nhật blog!')
      }).catch(err => alert('❌ Lỗi: ' + (err.response?.data?.error || err.message)))
    } else {
      api.post('/blogs', payload).then(() => {
        loadBlogs()
        resetBlogForm()
        alert('✅ Đã thêm blog mới!')
      }).catch(err => alert('❌ Lỗi: ' + (err.response?.data?.error || err.message)))
    }
  }

  function editBlog(blog) {
    setEditingBlog(blog)
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image || '',
      category: blog.category || '',
      tags: blog.tags?.join(', ') || '',
      author: blog.author || 'Grella Team',
      readTime: blog.readTime || 5
    })
  }

  function deleteBlog(id) {
    if (confirm('Xóa blog này?')) {
      api.delete(`/blogs/${id}`).then(() => {
        loadBlogs()
        alert('✅ Đã xóa blog!')
      }).catch(err => alert('❌ Lỗi: ' + (err.response?.data?.error || err.message)))
    }
  }

  function resetBlogForm() {
    setEditingBlog(null)
    setBlogForm({ title: '', slug: '', excerpt: '', content: '', image: '', category: '', tags: '', author: 'Grella Team', readTime: 5 })
  }

  if (!user || user.role !== 'admin') return null

  return (
    <>
      <Helmet>
        <title>Quản trị - Grella Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-4xl font-bold text-[#704214] mb-2">🛠️ Quản trị Grella</h1>
            <p className="text-[#5a4633]">Xin chào, {user.name}!</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-md mb-6 p-2">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'dashboard', label: '📊 Dashboard' },
                { id: 'products', label: '🧸 Sản phẩm' },
                { id: 'orders', label: '📦 Đơn hàng' },
                { id: 'users', label: '👥 Người dùng' },
                { id: 'blogs', label: '📝 Blog' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition ${
                    activeTab === tab.id ? 'bg-[#A8E6CF] text-[#225544] shadow-md' : 'text-[#704214] hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="text-4xl mb-2">🧸</div>
                  <div className="text-2xl font-bold text-[#704214]">{stats.products}</div>
                  <div className="text-sm text-gray-600">Sản phẩm</div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="text-4xl mb-2">📦</div>
                  <div className="text-2xl font-bold text-[#704214]">{stats.orders}</div>
                  <div className="text-sm text-gray-600">Đơn hàng</div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="text-4xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-[#704214]">{stats.users}</div>
                  <div className="text-sm text-gray-600">Người dùng</div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="text-4xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-[#704214]">{stats.blogs}</div>
                  <div className="text-sm text-gray-600">Blog</div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="text-4xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-[#2e7d32]">{stats.revenue.toLocaleString('vi-VN')}₫</div>
                  <div className="text-sm text-gray-600">Doanh thu</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#704214] mb-4">📦 Đơn hàng gần đây</h2>
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{order.buyer?.name}</div>
                        <div className="text-sm text-gray-600">{order.items?.length} sản phẩm</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#2e7d32]">{(order.total || 0).toLocaleString('vi-VN')}₫</div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>{order.status}</div>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <div className="text-center py-8 text-gray-500">Chưa có đơn hàng</div>}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-[#704214] mb-4">Danh sách sản phẩm ({products.length})</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map(p => (
                      <div key={p._id} className="bg-gray-50 p-4 rounded-xl">
                        <img src={p.img || 'https://via.placeholder.com/400x240'} className="w-full h-36 object-cover rounded-lg mb-3" alt={p.name} />
                        <div className="font-semibold text-[#704214]">{p.name}</div>
                        <div className="text-sm text-[#2e7d32] font-bold">{(p.price || 0).toLocaleString('vi-VN')}₫</div>
                        <div className="text-xs text-gray-600 mt-1">Kho: {p.stock || 0} | Tuổi: {p.age || 'N/A'}</div>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => editProduct(p)} className="flex-1 px-3 py-2 bg-[#A8E6CF] text-[#225544] rounded-lg hover:opacity-90">✏️ Sửa</button>
                          <button onClick={() => deleteProduct(p._id)} className="flex-1 px-3 py-2 bg-[#FFB7B2] text-white rounded-lg hover:opacity-90">🗑️ Xóa</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#704214] mb-4">{editingProduct ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm'}</h2>
                <form onSubmit={submitProduct} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Tên *</label>
                    <input required value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Giá *</label>
                    <input required type="number" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Kho</label>
                    <input type="number" value={productForm.stock} onChange={e => setProductForm(f => ({ ...f, stock: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">URL ảnh</label>
                    <input value={productForm.img} onChange={e => setProductForm(f => ({ ...f, img: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Tuổi</label>
                    <input value={productForm.age} onChange={e => setProductForm(f => ({ ...f, age: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Danh mục</label>
                    <input value={productForm.category} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Mô tả</label>
                    <textarea rows="3" value={productForm.desc} onChange={e => setProductForm(f => ({ ...f, desc: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 px-4 py-2 bg-[#A8E6CF] text-[#225544] font-medium rounded-lg hover:opacity-90">{editingProduct ? '💾 Lưu' : '➕ Thêm'}</button>
                    {editingProduct && <button type="button" onClick={resetProductForm} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">❌ Hủy</button>}
                  </div>
                </form>
              </aside>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#704214] mb-4">Quản lý đơn hàng ({orders.length})</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-[#704214]">KH: {order.buyer?.name}</div>
                        <div className="text-sm text-gray-600">📞 {order.buyer?.phone} | 📍 {order.buyer?.address}</div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString('vi-VN')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#2e7d32]">{(order.total || 0).toLocaleString('vi-VN')}₫</div>
                        <select value={order.status} onChange={e => updateOrderStatus(order._id, e.target.value)} className={`mt-2 px-3 py-1 rounded-lg text-sm font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'shipping' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <option value="pending">Chờ xử lý</option>
                          <option value="shipping">Đang giao</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <div className="text-sm font-medium text-[#704214] mb-2">Sản phẩm:</div>
                      <div className="space-y-1">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="text-sm flex justify-between">
                            <span>{item.name} x {item.qty}</span>
                            <span className="font-medium">{((item.price || 0) * item.qty).toLocaleString('vi-VN')}₫</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button onClick={() => deleteOrder(order._id)} className="px-4 py-2 bg-[#FFB7B2] text-white rounded-lg hover:opacity-90 text-sm">🗑️ Xóa</button>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <div className="text-center py-12 text-gray-500">Chưa có đơn hàng</div>}
              </div>
            </motion.div>
          )}

          {activeTab === 'blogs' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-[#704214] mb-4">Danh sách Blog ({blogs.length})</h2>
                  <div className="space-y-4">
                    {blogs.map(blog => (
                      <div key={blog._id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex gap-4">
                          {blog.image && (
                            <img src={blog.image} className="w-32 h-24 object-cover rounded-lg" alt={blog.title} />
                          )}
                          <div className="flex-1">
                            <div className="font-bold text-[#704214] mb-1">{blog.title}</div>
                            <div className="text-sm text-gray-600 mb-2 line-clamp-2">{blog.excerpt}</div>
                            <div className="flex gap-2 text-xs text-gray-500">
                              <span>🏷️ {blog.category || 'N/A'}</span>
                              <span>📖 {blog.readTime} phút</span>
                              <span>🔗 {blog.slug}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => editBlog(blog)} className="flex-1 px-3 py-2 bg-[#A8E6CF] text-[#225544] rounded-lg hover:opacity-90 text-sm">✏️ Sửa</button>
                          <button onClick={() => deleteBlog(blog._id)} className="flex-1 px-3 py-2 bg-[#FFB7B2] text-white rounded-lg hover:opacity-90 text-sm">🗑️ Xóa</button>
                        </div>
                      </div>
                    ))}
                    {blogs.length === 0 && <div className="text-center py-12 text-gray-500">Chưa có blog nào</div>}
                  </div>
                </div>
              </div>

              <aside className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#704214] mb-4">{editingBlog ? '✏️ Sửa Blog' : '➕ Thêm Blog'}</h2>
                <form onSubmit={submitBlog} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Tiêu đề *</label>
                    <input required value={blogForm.title} onChange={e => setBlogForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Slug *</label>
                    <input required value={blogForm.slug} onChange={e => setBlogForm(f => ({ ...f, slug: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" placeholder="vi-du-slug" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Tóm tắt *</label>
                    <textarea required rows="2" value={blogForm.excerpt} onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Nội dung *</label>
                    <textarea required rows="6" value={blogForm.content} onChange={e => setBlogForm(f => ({ ...f, content: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">URL ảnh</label>
                    <input value={blogForm.image} onChange={e => setBlogForm(f => ({ ...f, image: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Danh mục</label>
                    <input value={blogForm.category} onChange={e => setBlogForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" placeholder="Montessori" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Tags (phân cách bằng dấu phẩy)</label>
                    <input value={blogForm.tags} onChange={e => setBlogForm(f => ({ ...f, tags: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" placeholder="montessori, đồ chơi" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Tác giả</label>
                    <input value={blogForm.author} onChange={e => setBlogForm(f => ({ ...f, author: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#704214] mb-1">Thời gian đọc (phút)</label>
                    <input type="number" value={blogForm.readTime} onChange={e => setBlogForm(f => ({ ...f, readTime: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 px-4 py-2 bg-[#A8E6CF] text-[#225544] font-medium rounded-lg hover:opacity-90">{editingBlog ? '💾 Lưu' : '➕ Thêm'}</button>
                    {editingBlog && <button type="button" onClick={resetBlogForm} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">❌ Hủy</button>}
                  </div>
                </form>
              </aside>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#704214] mb-4">Quản lý người dùng ({users.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-[#704214]">Tên</th>
                      <th className="text-left py-3 px-4 text-[#704214]">Email</th>
                      <th className="text-left py-3 px-4 text-[#704214]">SĐT</th>
                      <th className="text-left py-3 px-4 text-[#704214]">Vai trò</th>
                      <th className="text-left py-3 px-4 text-[#704214]">Ngày tạo</th>
                      <th className="text-center py-3 px-4 text-[#704214]">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{u.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{u.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{u.phone || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                          }`}>{u.role === 'admin' ? '👑 Admin' : '👤 User'}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => toggleUserRole(u._id, u.role)} className="px-3 py-1 bg-[#A8E6CF] text-[#225544] rounded-lg hover:opacity-90 text-sm">🔄 Đổi</button>
                            <button onClick={() => deleteUser(u._id)} className="px-3 py-1 bg-[#FFB7B2] text-white rounded-lg hover:opacity-90 text-sm">🗑️ Xóa</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && <div className="text-center py-12 text-gray-500">Chưa có người dùng</div>}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
