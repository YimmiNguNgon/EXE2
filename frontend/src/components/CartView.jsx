import React from 'react'
import { useOutletContext } from 'react-router-dom'
import api from '../api'

export default function CartView(){
  const { cart, changeQty, removeFromCart } = useOutletContext();
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);

  async function checkout(){
    const buyer = { name: 'Khách hàng demo', phone: '0123456789', address: 'Hanoi' };
    const items = cart.map(i=> ({ productId: i.id, name: i.name, price: i.price, qty: i.qty }));
    const res = await api.post('/orders', { buyer, items, total });
    alert('Đặt hàng thành công! ID: ' + res.data._id);
    localStorage.removeItem('grella_cart');
    window.location.reload();
  }

  return (
    <div className='bg-white p-4 rounded shadow'>
      <h3 className='font-bold mb-2'>Giỏ hàng</h3>
      {cart.length===0 ? <div>Giỏ hàng trống</div> : (
        <div className='space-y-3'>
          {cart.map(it=> (
            <div key={it.id} className='flex items-center gap-3'>
              <img src={it.img || 'https://via.placeholder.com/80'} className='w-16 h-16 object-cover rounded' alt='' />
              <div className='flex-1'>
                <div className='font-semibold'>{it.name}</div>
                <div className='text-sm text-gray-500'>{it.price.toLocaleString('vi-VN')}₫</div>
                <div className='mt-1 flex items-center gap-2'>
                  <button onClick={()=> changeQty(it.id, -1)} className='px-2 py-0.5 border rounded'>-</button>
                  <div className='px-2'>{it.qty}</div>
                  <button onClick={()=> changeQty(it.id, +1)} className='px-2 py-0.5 border rounded'>+</button>
                  <button onClick={()=> removeFromCart(it.id)} className='ml-2 text-sm text-red-500'>Xóa</button>
                </div>
              </div>
            </div>
          ))}
          <div className='border-t pt-3 flex justify-between items-center'>
            <div className='font-semibold'>Tổng: {total.toLocaleString('vi-VN')}₫</div>
            <button onClick={checkout} className='px-3 py-1 bg-green-600 text-white rounded'>Thanh toán</button>
          </div>
        </div>
      )}
    </div>
  )
}
