import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './components/Footer'

export default function App(){
  const [cart, setCart] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('grella_cart')) || [] }catch{ return [] }
  });
  const [user, setUser] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('user')) || null }catch{ return null }
  });
  
  useEffect(()=> localStorage.setItem('grella_cart', JSON.stringify(cart)), [cart]);

  // Listen for storage changes (logout from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user')) || null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if(found) {
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
        notification.textContent = `✅ Đã thêm ${product.name} vào giỏ hàng!`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        
        return prev.map(p=> p.id===product.id?{...p, qty:p.qty+1}:p);
      }
      
      // Show notification for new item
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
      notification.textContent = `✅ Đã thêm ${product.name} vào giỏ hàng!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
      return [...prev, {...product, qty:1}];
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(p=> p.id !== id));
  const changeQty = (id, delta) => setCart(prev => prev.map(p=> p.id===id?{...p, qty: Math.max(1, p.qty+delta)}:p));

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white font-sans'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-6xl mx-auto p-4 flex justify-between items-center'>
          <Link to='/' className='flex items-center gap-3 hover:opacity-80 transition'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#704214] to-[#8B5A2B] rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md'>G</div>
            <div>
              <div className='font-bold text-xl text-[#704214]'>Grella</div>
              <div className='text-xs text-[#6a4b3b]'>Đồ chơi sinh học Montessori</div>
            </div>
          </Link>

          <nav className='flex items-center gap-6'>
            <Link to='/about' className='text-sm text-[#704214] hover:text-[#8B5A2B] font-medium transition'>
              🌱 Giới thiệu
            </Link>
            <Link to='/products' className='text-sm text-[#704214] hover:text-[#8B5A2B] font-medium transition'>
              🧸 Sản phẩm
            </Link>
            <Link to='/blog' className='text-sm text-[#704214] hover:text-[#8B5A2B] font-medium transition'>
              📚 Blog
            </Link>
            {user ? (
              <Link to='/profile' className='text-sm text-[#704214] hover:text-[#8B5A2B] font-medium transition'>
                👤 {user.name}
              </Link>
            ) : (
              <Link to='/login' className='text-sm text-[#704214] hover:text-[#8B5A2B] font-medium transition'>
                Đăng nhập
              </Link>
            )}
            <Link to='/cart' className='text-sm font-medium bg-[#A8E6CF] text-[#225544] px-3 py-1 rounded-full hover:bg-[#8FD9B6] transition'>
              🛒 {cart.reduce((s,i)=> s+i.qty,0)}
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet context={{ cart, setCart, addToCart, removeFromCart, changeQty, user, setUser }} />
      </main>

      <Footer />
    </div>
  )
}
