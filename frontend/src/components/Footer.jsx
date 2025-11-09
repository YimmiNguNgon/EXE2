import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#704214] to-[#8B5A2B] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-[#704214] text-lg shadow-md">
                G
              </div>
              <div>
                <div className="font-bold text-xl">Grella</div>
                <div className="text-xs text-[#FFD7A8]">Đồ chơi sinh học</div>
              </div>
            </div>
            <p className="text-sm text-[#FFD7A8] leading-relaxed">
              Đồ chơi Montessori sinh học an toàn, thân thiện với môi trường, 
              giúp trẻ phát triển toàn diện.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🏠 Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🌱 Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🧸 Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  📚 Blog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🛒 Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  📞 Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  ❓ FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🚚 Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🔄 Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  🔒 Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD7A8]">📍</span>
                <span className="text-sm text-[#FFD7A8]">
                  Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD7A8]">📧</span>
                <a href="mailto:contact@grella.com" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  contact@grella.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD7A8]">📱</span>
                <a href="tel:0123456789" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  0123 456 789
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4 flex gap-3">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <span className="text-sm">🐦</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#FFD7A8]">
            © 2024 Grella. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-sm text-[#FFD7A8] hover:text-white transition">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
