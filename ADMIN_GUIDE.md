# 🛠️ Hướng dẫn sử dụng Trang Quản trị Admin - Grella

## 📋 Tổng quan

Trang quản trị admin đã được tạo hoàn chỉnh với giao diện hiện đại và đầy đủ chức năng quản lý.

## ✨ Tính năng chính

### 1. 📊 Dashboard (Trang tổng quan)
- **Thống kê tổng quan:**
  - 🧸 Tổng số sản phẩm
  - 📦 Tổng số đơn hàng
  - 👥 Tổng số người dùng
  - 💰 Tổng doanh thu
- **Đơn hàng gần đây:** Hiển thị 5 đơn hàng mới nhất với trạng thái

### 2. 🧸 Quản lý Sản phẩm
- **Danh sách sản phẩm:**
  - Hiển thị tất cả sản phẩm dạng grid
  - Thông tin: Tên, giá, số lượng kho, độ tuổi
  - Nút sửa và xóa cho mỗi sản phẩm
  
- **Form thêm/sửa sản phẩm:**
  - Tên sản phẩm (*)
  - Giá (VND) (*)
  - Số lượng kho
  - URL ảnh
  - Độ tuổi
  - Danh mục
  - Mô tả

### 3. 📦 Quản lý Đơn hàng
- **Danh sách đơn hàng:**
  - Thông tin khách hàng (tên, SĐT, địa chỉ)
  - Danh sách sản phẩm trong đơn
  - Tổng tiền
  - Ngày tạo đơn
  
- **Cập nhật trạng thái:**
  - Chờ xử lý (pending)
  - Đang giao (shipping)
  - Hoàn thành (completed)
  - Đã hủy (cancelled)
  
- **Xóa đơn hàng**

### 4. 👥 Quản lý Người dùng
- **Danh sách người dùng (dạng bảng):**
  - Tên
  - Email
  - Số điện thoại
  - Vai trò (User/Admin)
  - Ngày tạo
  
- **Chức năng:**
  - 🔄 Đổi vai trò (User ↔ Admin)
  - 🗑️ Xóa người dùng

## 🔐 Bảo mật

- **Kiểm tra quyền truy cập:** Chỉ user có `role: 'admin'` mới được truy cập
- **Tự động chuyển hướng:** User không phải admin sẽ bị chuyển về trang chủ
- **Thông báo:** Hiển thị cảnh báo khi không có quyền

## 🎨 Giao diện

- **Màu sắc:** Sử dụng bảng màu Grella (xanh lá, nâu, vàng pastel)
- **Animation:** Framer Motion cho hiệu ứng mượt mà
- **Responsive:** Tương thích với mọi kích thước màn hình
- **Tab navigation:** Dễ dàng chuyển đổi giữa các phần

## 🔌 API Endpoints đã thêm

### Backend Routes

#### Auth Routes (`/api/auth`)
```javascript
GET    /api/auth/users          // Lấy danh sách tất cả users
PUT    /api/auth/users/:id      // Cập nhật vai trò user
DELETE /api/auth/users/:id      // Xóa user
```

#### Order Routes (`/api/orders`)
```javascript
PUT    /api/orders/:id          // Cập nhật trạng thái đơn hàng
DELETE /api/orders/:id          // Xóa đơn hàng
```

## 🚀 Cách sử dụng

### 1. Truy cập trang Admin
```
http://localhost:5173/admin
```

### 2. Đăng nhập với tài khoản Admin
- Cần có tài khoản với `role: 'admin'` trong database
- Nếu chưa có, tạo admin bằng cách:
  1. Đăng ký tài khoản bình thường
  2. Vào MongoDB và đổi `role` từ `user` thành `admin`

### 3. Sử dụng các tab
- Click vào các tab để chuyển đổi giữa Dashboard, Sản phẩm, Đơn hàng, Người dùng
- Mọi thay đổi được lưu ngay lập tức vào database

## 📁 Files đã tạo/sửa

### Frontend
- ✅ `frontend/src/pages/Admin.jsx` - Trang admin hoàn chỉnh (đã thay thế)

### Backend
- ✅ `backend/routes/auth.js` - Thêm endpoints quản lý user
- ✅ `backend/routes/orders.js` - Thêm endpoints quản lý đơn hàng

## 🎯 Tính năng nổi bật

1. **Dashboard trực quan** với thống kê real-time
2. **Quản lý sản phẩm** với form đầy đủ (bao gồm stock, category)
3. **Quản lý đơn hàng** với cập nhật trạng thái nhanh
4. **Quản lý người dùng** với phân quyền admin/user
5. **UI/UX hiện đại** với animation và responsive design
6. **Bảo mật tốt** với kiểm tra quyền admin

## 🔧 Lưu ý

- Tất cả các thao tác xóa đều có confirm dialog
- Dữ liệu được load tự động khi vào trang
- Stats được tính toán tự động từ dữ liệu thực
- Form validation đầy đủ cho các trường bắt buộc

## 📞 Hỗ trợ

Nếu có vấn đề, kiểm tra:
1. User đã có role admin chưa?
2. Backend server đã chạy chưa?
3. MongoDB đã kết nối chưa?
4. Console có báo lỗi gì không?

---

**Chúc bạn quản lý website thành công! 🎉**
