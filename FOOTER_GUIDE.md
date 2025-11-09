# 🦶 Hướng dẫn Footer - Grella

## ✨ Tổng quan

Footer đã được thêm vào **tất cả các trang** của website với thiết kế đẹp, chuyên nghiệp và responsive.

---

## 📋 Nội dung Footer

### **1. About Section (Giới thiệu)**
- ✅ Logo Grella
- ✅ Tên thương hiệu
- ✅ Slogan: "Đồ chơi sinh học"
- ✅ Mô tả ngắn về sản phẩm

### **2. Quick Links (Liên kết nhanh)**
- ✅ 🏠 Trang chủ
- ✅ 🌱 Giới thiệu
- ✅ 🧸 Sản phẩm
- ✅ 📚 Blog
- ✅ 🛒 Giỏ hàng

### **3. Support (Hỗ trợ)**
- ✅ 📞 Liên hệ
- ✅ ❓ FAQ
- ✅ 🚚 Chính sách giao hàng
- ✅ 🔄 Chính sách đổi trả
- ✅ 🔒 Chính sách bảo mật

### **4. Contact (Liên hệ)**
- ✅ 📍 Địa chỉ: Hà Nội, Việt Nam
- ✅ 📧 Email: contact@grella.com
- ✅ 📱 Phone: 0123 456 789
- ✅ Social Media Icons (Facebook, Instagram, Twitter)

### **5. Bottom Bar**
- ✅ Copyright: © 2024 Grella
- ✅ Điều khoản sử dụng
- ✅ Chính sách bảo mật

---

## 🎨 Thiết kế

### **Màu sắc:**
- Background: Gradient `from-[#704214] to-[#8B5A2B]` (Nâu đậm)
- Text: White
- Secondary text: `#FFD7A8` (Vàng nhạt)
- Hover: White

### **Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]              Quick Links      Support      Contact  │
│  Grella              - Trang chủ      - Liên hệ    📍 Hà Nội│
│  Đồ chơi sinh học    - Giới thiệu     - FAQ        📧 Email │
│  Mô tả...            - Sản phẩm       - Giao hàng  📱 Phone │
│                      - Blog           - Đổi trả    [Social] │
│                      - Giỏ hàng       - Bảo mật             │
├─────────────────────────────────────────────────────────────┤
│  © 2024 Grella              Điều khoản | Chính sách bảo mật │
└─────────────────────────────────────────────────────────────┘
```

### **Responsive:**
- **Desktop (≥768px):** 4 cột
- **Mobile (<768px):** 1 cột, stack vertically

---

## 📁 Files

### **Đã tạo:**
- ✅ `frontend/src/components/Footer.jsx` - Footer component

### **Đã sửa:**
- ✅ `frontend/src/App.jsx` - Import và thêm Footer

---

## 🔧 Cách hoạt động

### **1. Footer Component:**
```jsx
import Footer from './components/Footer'

// Trong App.jsx:
<main>
  <Outlet />
</main>
<Footer />
```

### **2. Tự động hiển thị:**
Footer được thêm vào `App.jsx`, nên sẽ tự động hiển thị ở **tất cả các trang**:
- ✅ Home
- ✅ About
- ✅ Products
- ✅ Product Detail
- ✅ Blog
- ✅ Blog Post
- ✅ Cart
- ✅ Login
- ✅ Register
- ✅ Profile
- ✅ Admin

---

## 🎯 Tính năng

### **1. Navigation Links**
Tất cả links đều dùng React Router `<Link>`:
```jsx
<Link to="/products">🧸 Sản phẩm</Link>
```

### **2. Hover Effects**
```css
hover:text-white transition
```

### **3. Social Media Icons**
```jsx
<a href="#" className="w-8 h-8 bg-white/10 rounded-full...">
  <span>📘</span>
</a>
```

### **4. Responsive Grid**
```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
```

---

## 💡 Customization

### **Thay đổi thông tin liên hệ:**

Mở `frontend/src/components/Footer.jsx`:

```jsx
// Địa chỉ
<span className="text-sm text-[#FFD7A8]">
  Hà Nội, Việt Nam  {/* ← Sửa ở đây */}
</span>

// Email
<a href="mailto:contact@grella.com">
  contact@grella.com  {/* ← Sửa ở đây */}
</a>

// Phone
<a href="tel:0123456789">
  0123 456 789  {/* ← Sửa ở đây */}
</a>
```

### **Thêm/Xóa links:**

```jsx
<li>
  <Link to="/new-page" className="text-sm text-[#FFD7A8]...">
    🆕 Trang mới
  </Link>
</li>
```

### **Thay đổi màu sắc:**

```jsx
// Background
className="bg-gradient-to-br from-[#704214] to-[#8B5A2B]"

// Text color
className="text-[#FFD7A8]"
```

---

## 🌐 Social Media Links

Hiện tại là placeholder (`#`). Để thêm link thật:

```jsx
<a href="https://facebook.com/grella" target="_blank" rel="noopener noreferrer">
  <span>📘</span>
</a>
```

**Icons:**
- 📘 Facebook
- 📷 Instagram
- 🐦 Twitter

---

## 📱 Responsive Behavior

### **Desktop:**
```
[About] [Quick Links] [Support] [Contact]
```

### **Tablet:**
```
[About] [Quick Links]
[Support] [Contact]
```

### **Mobile:**
```
[About]
[Quick Links]
[Support]
[Contact]
```

---

## ✅ Checklist

- [x] Footer component tạo xong
- [x] Import vào App.jsx
- [x] Hiển thị ở tất cả trang
- [x] Responsive design
- [x] Hover effects
- [x] Navigation links
- [x] Contact info
- [x] Social media icons
- [x] Copyright notice
- [x] Bottom bar links

---

## 🎨 Design Features

1. **Gradient Background** - Nâu đậm chuyên nghiệp
2. **4-Column Layout** - Tổ chức rõ ràng
3. **Icon Integration** - Emoji icons dễ nhìn
4. **Hover Effects** - Interactive UX
5. **Responsive Grid** - Mobile-friendly
6. **Social Media** - Kết nối mạng xã hội
7. **Bottom Bar** - Legal links

---

## 📝 Code Structure

```jsx
<footer>
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4">
      {/* About */}
      {/* Quick Links */}
      {/* Support */}
      {/* Contact */}
    </div>
    
    {/* Bottom Bar */}
    <div className="border-t">
      <p>© 2024 Grella</p>
      <div>Links</div>
    </div>
  </div>
</footer>
```

---

## 🚀 Next Steps

Nếu muốn thêm tính năng:

1. **Newsletter Subscription:**
```jsx
<div>
  <h3>Đăng ký nhận tin</h3>
  <input type="email" placeholder="Email của bạn" />
  <button>Đăng ký</button>
</div>
```

2. **Payment Methods:**
```jsx
<div>
  <h3>Phương thức thanh toán</h3>
  <div className="flex gap-2">
    <img src="/visa.png" alt="Visa" />
    <img src="/mastercard.png" alt="Mastercard" />
  </div>
</div>
```

3. **Customer Reviews:**
```jsx
<div>
  <h3>Đánh giá</h3>
  <div>⭐⭐⭐⭐⭐ 4.9/5</div>
</div>
```

---

**Footer đã hoàn thiện và hiển thị ở tất cả trang! 🎉**
