import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5f8d] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-[#1e3a5f] text-sm shadow-md">
                DH
              </div>
              <div>
                <div className="font-bold text-xl">DearHim</div>
                <div className="text-xs text-[#d4af37]">Hộp quà dành cho nam</div>
              </div>
            </div>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              Hộp quà cá nhân hóa tinh tế cho nam, tạo trải nghiệm đáng nhớ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-[#cbd5e1] hover:text-white transition">
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
                <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
                  📞 Liên hệ : 0336 14 3011
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
                  ❓ FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
                  🚚 Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
                  🔄 Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
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
                <span className="text-[#d4af37]">📍</span>
                <span className="text-sm text-[#cbd5e1]">
                  Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37]">📧</span>
                <a href="mailto:contact@dearhim.vn" className="text-sm text-[#cbd5e1] hover:text-white transition">
                  huyhdhe187019@fpt.edu.vn
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD7A8]">📱</span>
                <a href="tel:0336143011" className="text-sm text-[#FFD7A8] hover:text-white transition">
                  0336 143 011
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4267B2]">📘</span>
                <a
                  href="https://www.facebook.com/profile.php?id=61587336933677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#93c5fd] hover:text-white transition font-medium"
                >
                  Facebook DearHim
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61587336933677"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#4267B2] rounded-full flex items-center justify-center hover:bg-[#5b7bd5] transition"
                title="Facebook DearHim"
              >
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <span className="text-sm">📷</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#cbd5e1]">
            © 2024 DearHim. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-sm text-[#cbd5e1] hover:text-white transition">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
