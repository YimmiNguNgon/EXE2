# 🚀 Hướng dẫn chạy Grella

## Backend Setup

1. **Cài đặt dependencies:**
```bash
cd backend
npm install
```

2. **Seed dữ liệu:**
```bash
# Seed products
node seed.js

# Seed users (Admin & User)
node seedUsers.js

# Seed blog posts
node seedBlogs.js
```

3. **Khởi động backend:**
```bash
npm run dev
```

Backend sẽ chạy tại: `http://localhost:4000`

## Frontend Setup

1. **Cài đặt dependencies:**
```bash
cd frontend
npm install
```

2. **Khởi động frontend:**
```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173` (hoặc port khác)

## 🔑 Demo Accounts

- **Admin:** `admin@grella.com` / `admin123`
- **User:** `user@grella.com` / `user123`

## 📝 Lưu ý

- Đảm bảo MongoDB đang chạy
- File `.env` trong backend cần có `MONGO_URI`
- Backend phải chạy trước khi test frontend
- Ảnh sản phẩm cần lưu vào `frontend/public/images/products/`

## 🎨 Ảnh sản phẩm cần lưu:

1. `solar-system.jpg` - Hệ sinh thái trí tuệ
2. `castle-blocks.jpg` - Kiến trúc sư nhỏ  
3. `counting-board.jpg` - Cây toán học
4. `alphabet-tree.jpg` - Vườn ngôn ngữ
5. `math-abacus.jpg` - Khám phá vũ trụ
6. `hero-banner.jpg` - Ảnh hero trang chủ
