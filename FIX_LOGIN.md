# 🔧 Hướng dẫn Sửa lỗi Đăng nhập

## ❌ Vấn đề: User không đăng nhập được

## ✅ Giải pháp - Làm theo thứ tự:

### Bước 1: Kiểm tra Backend đang chạy chưa

Mở terminal và chạy:
```bash
cd backend
node server.js
```

**Kết quả mong đợi:**
```
Grella backend running on 4000
```

Nếu thấy lỗi, kiểm tra:
- MongoDB có đang chạy không?
- File `.env` có đúng không?

---

### Bước 2: Kiểm tra có Users trong Database chưa

Mở terminal mới và chạy:
```bash
cd backend
node checkUsers.js
```

**Nếu không có users**, chạy:
```bash
node seedUsers.js
```

Hoặc tạo admin:
```bash
node createAdmin.js
```

---

### Bước 3: Test đăng nhập từ Backend

Chạy:
```bash
cd backend
node testLogin.js
```

Xem kết quả có hiển thị:
- ✅ Password matches: YES

---

### Bước 4: Kiểm tra Frontend

1. **Mở trình duyệt** và vào: `http://localhost:5173/login`

2. **Mở Developer Tools** (F12)

3. **Vào tab Console**

4. **Thử đăng nhập** với:
   - Email: `admin@grella.com`
   - Password: `admin123`

5. **Xem lỗi trong Console**

---

## 🔍 Các lỗi thường gặp:

### Lỗi 1: "Network Error" hoặc "ERR_CONNECTION_REFUSED"
**Nguyên nhân:** Backend không chạy

**Giải pháp:**
```bash
cd backend
node server.js
```

---

### Lỗi 2: "Email hoặc mật khẩu không đúng"
**Nguyên nhân:** Không có user trong database

**Giải pháp:**
```bash
cd backend
node seedUsers.js
```

---

### Lỗi 3: "Cannot read property 'comparePassword'"
**Nguyên nhân:** User model có vấn đề

**Giải pháp:** Xóa users và tạo lại:
```bash
cd backend
node seedUsers.js
```

---

### Lỗi 4: CORS Error
**Nguyên nhân:** Backend không cho phép frontend truy cập

**Giải pháp:** Đã có `cors()` trong server.js, restart backend:
```bash
# Ctrl+C để dừng
node server.js
```

---

## 🎯 Script Nhanh - Chạy tất cả cùng lúc

Tạo file `fix-login.bat` trong thư mục `backend`:

```batch
@echo off
echo ========================================
echo FIXING LOGIN ISSUES
echo ========================================
echo.

echo Step 1: Creating users...
node seedUsers.js
echo.

echo Step 2: Testing login...
node testLogin.js
echo.

echo ========================================
echo DONE! Try login now:
echo Email: admin@grella.com
echo Password: admin123
echo ========================================
pause
```

Chạy file này:
```bash
cd backend
fix-login.bat
```

---

## 📝 Thông tin đăng nhập mặc định:

### Admin:
- **Email:** admin@grella.com
- **Password:** admin123

### User thường:
- **Email:** user@grella.com
- **Password:** user123

---

## 🚀 Kiểm tra cuối cùng:

1. ✅ Backend đang chạy (port 4000)
2. ✅ Frontend đang chạy (port 5173)
3. ✅ MongoDB đã kết nối
4. ✅ Có users trong database
5. ✅ Không có lỗi CORS

**Nếu tất cả OK, đăng nhập sẽ thành công!**

---

## 💡 Debug Tips:

### Xem log Backend:
Trong terminal chạy backend, bạn sẽ thấy:
```
POST /api/auth/login 200
```
Nếu thấy 401 hoặc 500 = có lỗi

### Xem log Frontend:
Mở Console (F12), sẽ thấy:
```
Login error: [chi tiết lỗi]
```

### Test API trực tiếp:
Dùng Postman hoặc curl:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@grella.com","password":"admin123"}'
```

Kết quả mong đợi:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Admin Grella",
    "email": "admin@grella.com",
    "role": "admin"
  }
}
```

---

## 🆘 Vẫn không được?

Chạy lệnh này để reset hoàn toàn:

```bash
cd backend

# Xóa tất cả users
node -e "const mongoose = require('mongoose'); const User = require('./models/User'); require('dotenv').config(); mongoose.connect(process.env.MONGO_URI).then(() => User.deleteMany({})).then(() => console.log('Deleted all users')).then(() => process.exit());"

# Tạo lại users
node seedUsers.js

# Test
node testLogin.js
```

**Sau đó thử đăng nhập lại!**
