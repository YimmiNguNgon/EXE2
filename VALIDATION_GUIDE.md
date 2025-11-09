# ✅ Hướng dẫn Validation - Grella

## 📋 Tổng quan

Dự án đã được bổ sung **validation đầy đủ** cho cả Frontend và Backend để đảm bảo dữ liệu hợp lệ và an toàn.

---

## 🎯 Validation đã triển khai

### 1. **Authentication (Đăng ký & Đăng nhập)**

#### **Frontend (Register.jsx, Login.jsx):**
- ✅ Required fields (tất cả trường bắt buộc)
- ✅ Tên: Tối thiểu 2 ký tự
- ✅ Email: Format hợp lệ (regex)
- ✅ Password: Tối thiểu 6 ký tự
- ✅ Confirm Password: Phải khớp với password

#### **Backend (routes/auth.js):**
- ✅ Kiểm tra trường bắt buộc
- ✅ Tên: Tối thiểu 2 ký tự
- ✅ Email: Format hợp lệ (regex)
- ✅ Email: Chuyển thành lowercase và trim
- ✅ Password: Tối thiểu 6 ký tự
- ✅ Email đã tồn tại (đăng ký)

**Regex Email:**
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

---

### 2. **Orders (Đặt hàng)**

#### **Frontend (Cart.jsx):**
- ✅ Tên: Tối thiểu 2 ký tự
- ✅ Số điện thoại: Format Việt Nam (regex)
- ✅ Địa chỉ: Tối thiểu 10 ký tự
- ✅ Giỏ hàng không rỗng

#### **Backend (routes/orders.js):**
- ✅ Kiểm tra buyer, items, total
- ✅ Buyer name: Tối thiểu 2 ký tự
- ✅ Buyer phone: Format VN (regex)
- ✅ Buyer address: Tối thiểu 10 ký tự
- ✅ Items: Kiểm tra productId, name, price, qty
- ✅ Price & qty: Phải > 0
- ✅ Total: Phải > 0

**Regex Phone (VN):**
```javascript
/^(0|\+84)[0-9]{9,10}$/
```

**Ví dụ hợp lệ:**
- `0123456789`
- `0987654321`
- `+84123456789`

---

### 3. **Profile (Cập nhật thông tin)**

#### **Frontend (Profile.jsx):**
- ✅ Tên: Required khi edit
- ✅ Email: Không thể thay đổi (disabled)

#### **Backend (routes/auth.js):**
- ✅ Token validation
- ✅ User existence check

---

### 4. **Admin (Quản lý sản phẩm)**

#### **Frontend (Admin.jsx):**
- ✅ Tên sản phẩm: Required
- ✅ Giá: Required, type="number"
- ✅ Số lượng kho: type="number"

---

## 📊 Bảng tổng hợp Validation

| Trường | Frontend | Backend | Quy tắc |
|--------|----------|---------|---------|
| **Tên** | ✅ | ✅ | Min 2 ký tự, trim |
| **Email** | ✅ | ✅ | Format hợp lệ, lowercase |
| **Password** | ✅ | ✅ | Min 6 ký tự |
| **Phone** | ✅ | ✅ | Format VN: 0xxxxxxxxx |
| **Address** | ✅ | ✅ | Min 10 ký tự |
| **Price** | ✅ | ✅ | > 0, number |
| **Quantity** | ✅ | ✅ | > 0, number |

---

## 🔒 Security Features

### 1. **Input Sanitization**
- ✅ Trim whitespace
- ✅ Lowercase email
- ✅ Remove spaces from phone

### 2. **Password Security**
- ✅ Minimum length: 6 characters
- ✅ Hashed with bcrypt (backend)
- ✅ Never sent in response

### 3. **Email Uniqueness**
- ✅ Check duplicate on register
- ✅ Case-insensitive comparison

### 4. **Error Messages**
- ✅ User-friendly Vietnamese messages
- ✅ Specific validation errors
- ✅ No sensitive information leaked

---

## 💡 Validation Rules Chi tiết

### **Email Format:**
```
✅ Valid:
- user@example.com
- test.user@domain.co.uk
- admin@grella.com

❌ Invalid:
- user@
- @domain.com
- user domain.com
- user@domain
```

### **Phone Format (Vietnam):**
```
✅ Valid:
- 0123456789 (10 digits)
- 0987654321 (10 digits)
- +84123456789 (with country code)
- 01234567890 (11 digits)

❌ Invalid:
- 123456789 (không bắt đầu bằng 0)
- 012345 (quá ngắn)
- abc123456 (có chữ)
```

### **Password:**
```
✅ Valid:
- abc123 (min 6 chars)
- password123
- MyP@ssw0rd

❌ Invalid:
- 12345 (< 6 chars)
- abc (< 6 chars)
```

### **Name:**
```
✅ Valid:
- Nguyễn Văn A (min 2 chars)
- John Doe
- Admin

❌ Invalid:
- A (< 2 chars)
- "" (empty)
- "  " (only spaces)
```

### **Address:**
```
✅ Valid:
- 123 Đường ABC, Quận 1, TP.HCM (min 10 chars)
- Số 5, Ngõ 10, Hà Nội

❌ Invalid:
- Hà Nội (< 10 chars)
- "" (empty)
```

---

## 🎨 Error Display

### **Frontend:**
```jsx
{error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
    ❌ {error}
  </div>
)}
```

### **Backend:**
```javascript
res.status(400).json({ error: 'Thông báo lỗi' })
```

---

## 🧪 Testing Validation

### **Test Cases:**

#### **1. Register:**
```
❌ Empty fields → "Vui lòng điền đầy đủ thông tin"
❌ Name < 2 chars → "Tên phải có ít nhất 2 ký tự"
❌ Invalid email → "Email không hợp lệ"
❌ Password < 6 → "Mật khẩu phải có ít nhất 6 ký tự"
❌ Password mismatch → "Mật khẩu không khớp"
❌ Email exists → "Email đã được sử dụng"
✅ Valid data → Success
```

#### **2. Login:**
```
❌ Empty fields → "Vui lòng điền đầy đủ thông tin"
❌ Invalid email → "Email không hợp lệ"
❌ Wrong credentials → "Email hoặc mật khẩu không đúng"
✅ Valid credentials → Success
```

#### **3. Checkout:**
```
❌ Name < 2 → "Tên phải có ít nhất 2 ký tự"
❌ Invalid phone → "Số điện thoại không hợp lệ"
❌ Address < 10 → "Địa chỉ phải có ít nhất 10 ký tự"
❌ Empty cart → Cannot checkout
✅ Valid data → Order created
```

---

## 📝 Code Examples

### **Frontend Validation (React):**
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  // Validation
  if (name.trim().length < 2) {
    setError('Tên phải có ít nhất 2 ký tự');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Email không hợp lệ');
    return;
  }

  // Submit...
};
```

### **Backend Validation (Express):**
```javascript
router.post('/endpoint', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Vui lòng điền đầy đủ thông tin' 
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Tên phải có ít nhất 2 ký tự' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email không hợp lệ' 
      });
    }

    // Process...
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 🔧 Files Modified

### **Backend:**
- ✅ `backend/routes/auth.js` - Auth validation
- ✅ `backend/routes/orders.js` - Order validation

### **Frontend:**
- ✅ `frontend/src/pages/Register.jsx` - Register validation
- ✅ `frontend/src/pages/Cart.jsx` - Checkout validation

---

## ✅ Checklist Validation

- [x] Email format validation
- [x] Phone format validation (VN)
- [x] Password minimum length
- [x] Name minimum length
- [x] Address minimum length
- [x] Required fields check
- [x] Trim whitespace
- [x] Lowercase email
- [x] Duplicate email check
- [x] Price > 0 validation
- [x] Quantity > 0 validation
- [x] Frontend validation
- [x] Backend validation
- [x] User-friendly error messages

---

## 🎯 Best Practices

1. **Always validate on both Frontend and Backend**
2. **Use regex for format validation**
3. **Trim and sanitize input**
4. **Show user-friendly error messages**
5. **Never trust client-side validation alone**
6. **Log validation errors for debugging**
7. **Return specific error messages**

---

**Validation đã hoàn thiện! 🎉**
