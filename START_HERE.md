# 🚀 HƯỚNG DẪN KHỞI ĐỘNG GRELLA

## ⚡ QUICK START - 3 BƯỚC ĐƠN GIẢN

### Bước 1: Khởi động Backend
```bash
cd backend
node server.js
```
**Chờ thấy:** `Grella backend running on 4000`

### Bước 2: Khởi động Frontend (Terminal mới)
```bash
cd frontend
npm run dev
```
**Chờ thấy:** `Local: http://localhost:5173`

### Bước 3: Tạo Users (Terminal thứ 3)
```bash
cd backend
node fixLogin.js
```
HOẶC double-click file: `backend/fix-login.bat`

---

## 🔐 THÔNG TIN ĐĂNG NHẬP

### 👑 Admin:
- **Email:** admin@grella.com
- **Password:** admin123
- **Truy cập:** http://localhost:5173/admin

### 👤 User:
- **Email:** user@grella.com  
- **Password:** user123
- **Truy cập:** http://localhost:5173/profile

---

## 📁 CẤU TRÚC DỰ ÁN

```
grella/
├── backend/              # Node.js + Express + MongoDB
│   ├── models/          # User, Product, Order, Blog
│   ├── routes/          # API endpoints
│   ├── server.js        # Main server
│   ├── fixLogin.js      # 🔧 Script sửa lỗi đăng nhập
│   ├── fix-login.bat    # 🔧 Script Windows
│   └── seedUsers.js     # Tạo users mẫu
│
├── frontend/            # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── pages/      # Home, Products, Admin, Profile...
│   │   ├── components/ # Reusable components
│   │   └── api.js      # Axios config
│   └── package.json
│
└── QUICK_FIX.txt       # 📝 Hướng dẫn sửa lỗi nhanh
```

---

## 🎯 CÁC TRANG CHÍNH

| Trang | URL | Mô tả |
|-------|-----|-------|
| 🏠 Trang chủ | http://localhost:5173 | Landing page |
| 🧸 Sản phẩm | http://localhost:5173/products | Danh sách sản phẩm |
| 🔐 Đăng nhập | http://localhost:5173/login | Login form |
| 📝 Đăng ký | http://localhost:5173/register | Register form |
| 👤 Profile | http://localhost:5173/profile | Thông tin user |
| 👑 Admin | http://localhost:5173/admin | Quản trị (admin only) |
| 📚 Blog | http://localhost:5173/blog | Danh sách blog |
| ℹ️ Giới thiệu | http://localhost:5173/about | About page |

---

## 🛠️ CÁC SCRIPT HỮU ÍCH

### Sửa lỗi đăng nhập:
```bash
cd backend
node fixLogin.js
```

### Kiểm tra users:
```bash
cd backend
node checkUsers.js
```

### Test đăng nhập:
```bash
cd backend
node testLogin.js
```

### Tạo admin mới:
```bash
cd backend
node createAdmin.js
```

### Seed tất cả dữ liệu:
```bash
cd backend
node seed.js          # Products
node seedBlogs.js     # Blogs
node seedUsers.js     # Users
```

---

## ❌ XỬ LÝ LỖI THƯỜNG GẶP

### 1. "Cannot connect to MongoDB"
**Giải pháp:**
- Kiểm tra MongoDB đã chạy chưa
- Kiểm tra `backend/.env` có `MONGO_URI` đúng không

### 2. "Port 4000 already in use"
**Giải pháp:**
```bash
# Tìm process đang dùng port 4000
netstat -ano | findstr :4000

# Kill process (thay PID bằng số tìm được)
taskkill /PID <PID> /F
```

### 3. "Email hoặc mật khẩu không đúng"
**Giải pháp:**
```bash
cd backend
node fixLogin.js
```

### 4. "Network Error" khi đăng nhập
**Giải pháp:**
- Kiểm tra backend đang chạy (port 4000)
- Kiểm tra `frontend/src/api.js` có đúng URL không

### 5. Không vào được trang Admin
**Giải pháp:**
- Đăng nhập với tài khoản admin
- Email: admin@grella.com
- Password: admin123

---

## 📊 TÍNH NĂNG CHÍNH

### 🛍️ Cho User:
- ✅ Xem và tìm kiếm sản phẩm
- ✅ Thêm vào giỏ hàng
- ✅ Đặt hàng
- ✅ Xem lịch sử đơn hàng
- ✅ Cập nhật thông tin cá nhân
- ✅ Đọc blog

### 👑 Cho Admin:
- ✅ Dashboard với thống kê
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng (xem, cập nhật trạng thái, xóa)
- ✅ Quản lý người dùng (xem, đổi role, xóa)
- ✅ Giao diện hiện đại với tabs

---

## 🔧 CÀI ĐẶT LẦN ĐẦU

### 1. Clone project (nếu chưa có)
```bash
git clone <repo-url>
cd grella
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

### 3. Tạo file .env
```bash
cd backend
# Tạo file .env với nội dung:
MONGO_URI=mongodb://localhost:27017/grella
JWT_SECRET=grella-secret-key-2024
PORT=4000
```

### 4. Cài đặt Frontend
```bash
cd frontend
npm install
```

### 5. Seed dữ liệu
```bash
cd backend
node seed.js
node seedBlogs.js
node seedUsers.js
```

### 6. Khởi động
```bash
# Terminal 1
cd backend
node server.js

# Terminal 2
cd frontend
npm run dev
```

---

## 📞 LIÊN HỆ & HỖ TRỢ

- 📧 Email: support@grella.com
- 🌐 Website: http://localhost:5173
- 📚 Docs: Xem các file `*_GUIDE.md`

---

## 📝 GHI CHÚ

- Backend chạy trên port **4000**
- Frontend chạy trên port **5173**
- MongoDB mặc định port **27017**
- Token hết hạn sau **7 ngày**

---

## ✅ CHECKLIST TRƯỚC KHI BẮT ĐẦU

- [ ] MongoDB đã cài đặt và đang chạy
- [ ] Node.js đã cài đặt (v14+)
- [ ] npm đã cài đặt
- [ ] Đã chạy `npm install` ở cả backend và frontend
- [ ] File `.env` đã tạo trong backend
- [ ] Đã seed dữ liệu (products, blogs, users)

---

**🎉 Chúc bạn code vui vẻ!**
