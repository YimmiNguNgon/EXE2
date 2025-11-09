# 🛒 Hướng dẫn Giỏ hàng - Grella

## ✨ Tính năng mới

### 1. 🛒 Trang Giỏ hàng đầy đủ
- **URL:** http://localhost:5173/cart
- **Giao diện:** Hiện đại, responsive
- **Chức năng:** Quản lý giỏ hàng và thanh toán

---

## 📋 Các tính năng chính

### 1. **Hiển thị sản phẩm trong giỏ**
- ✅ Hình ảnh sản phẩm
- ✅ Tên và giá
- ✅ Số lượng (có thể tăng/giảm)
- ✅ Tổng tiền từng sản phẩm
- ✅ Nút xóa sản phẩm

### 2. **Quản lý số lượng**
- ✅ Nút **−** giảm số lượng
- ✅ Nút **+** tăng số lượng
- ✅ Số lượng tối thiểu: 1
- ✅ Tự động tính lại tổng tiền

### 3. **Form thông tin đặt hàng**
- ✅ Họ và tên (bắt buộc)
- ✅ Số điện thoại (bắt buộc)
- ✅ Địa chỉ giao hàng (bắt buộc)
- ✅ Validation đầy đủ

### 4. **Tính phí vận chuyển**
- ✅ Đơn hàng < 500,000₫: Phí ship 30,000₫
- ✅ Đơn hàng ≥ 500,000₫: **Miễn phí ship**
- ✅ Hiển thị thông báo khuyến khích mua thêm

### 5. **Thông báo khi thêm vào giỏ**
- ✅ Popup thông báo màu xanh
- ✅ Hiển thị tên sản phẩm
- ✅ Tự động biến mất sau 3 giây
- ✅ Animation bounce

### 6. **Nút giỏ hàng trên header**
- ✅ Click vào để xem giỏ hàng
- ✅ Hiển thị số lượng sản phẩm
- ✅ Hover effect

---

## 🎯 Cách sử dụng

### **Thêm sản phẩm vào giỏ:**
1. Vào trang Sản phẩm: http://localhost:5173/products
2. Click nút **"🛒 Thêm"** trên sản phẩm
3. Thấy thông báo: "✅ Đã thêm [tên SP] vào giỏ hàng!"
4. Số lượng trên icon giỏ hàng tăng lên

### **Xem giỏ hàng:**
1. Click vào icon **🛒** trên header
2. Hoặc vào: http://localhost:5173/cart

### **Quản lý giỏ hàng:**
1. **Tăng số lượng:** Click nút **+**
2. **Giảm số lượng:** Click nút **−**
3. **Xóa sản phẩm:** Click **🗑️ Xóa**

### **Đặt hàng:**
1. Điền thông tin:
   - Họ và tên
   - Số điện thoại
   - Địa chỉ giao hàng
2. Kiểm tra tổng tiền
3. Click **"💳 Đặt hàng"**
4. Nhận mã đơn hàng
5. Tự động chuyển đến trang Profile

---

## 💰 Tính phí

### **Tạm tính:**
Tổng giá trị các sản phẩm

### **Phí vận chuyển:**
- Đơn < 500,000₫: **30,000₫**
- Đơn ≥ 500,000₫: **Miễn phí** 🎉

### **Tổng cộng:**
Tạm tính + Phí vận chuyển

### **Ví dụ:**
```
Sản phẩm A: 200,000₫ x 2 = 400,000₫
Sản phẩm B: 150,000₫ x 1 = 150,000₫
─────────────────────────────────────
Tạm tính:              550,000₫
Phí vận chuyển:        Miễn phí ✅
─────────────────────────────────────
Tổng cộng:             550,000₫
```

---

## 🎨 Giao diện

### **Desktop:**
```
┌─────────────────────────────────────────────────────────┐
│  🛒 Giỏ hàng của bạn                                    │
├─────────────────────────┬───────────────────────────────┤
│  [Sản phẩm 1]          │  Thông tin đặt hàng           │
│  [Hình] Tên SP         │  ┌─────────────────────────┐  │
│  200,000₫              │  │ Họ và tên: [_______]    │  │
│  [−] 2 [+] 🗑️          │  │ SĐT: [_______]          │  │
│                        │  │ Địa chỉ: [_______]      │  │
│  [Sản phẩm 2]          │  ├─────────────────────────┤  │
│  [Hình] Tên SP         │  │ Tạm tính: 550,000₫      │  │
│  150,000₫              │  │ Ship: Miễn phí          │  │
│  [−] 1 [+] 🗑️          │  │ Tổng: 550,000₫          │  │
│                        │  ├─────────────────────────┤  │
│                        │  │ [💳 Đặt hàng]           │  │
│                        │  └─────────────────────────┘  │
└─────────────────────────┴───────────────────────────────┘
```

### **Mobile:**
Responsive, hiển thị 1 cột

---

## 🔔 Thông báo

### **Khi thêm vào giỏ:**
```
┌──────────────────────────────────────┐
│ ✅ Đã thêm [Tên SP] vào giỏ hàng!   │
└──────────────────────────────────────┘
```
- Vị trí: Góc trên bên phải
- Màu: Xanh lá
- Thời gian: 3 giây
- Animation: Bounce

### **Khi đặt hàng thành công:**
```
┌──────────────────────────────────────┐
│ ✅ Đặt hàng thành công!              │
│ Mã đơn hàng: ABC12345                │
└──────────────────────────────────────┘
```

---

## 📱 Responsive Design

### **Desktop (>1024px):**
- Layout 2 cột: Giỏ hàng (2/3) + Form (1/3)
- Form sticky bên phải

### **Tablet (768px-1024px):**
- Layout 2 cột thu nhỏ

### **Mobile (<768px):**
- Layout 1 cột
- Form ở dưới danh sách sản phẩm

---

## 🔌 API Endpoints

### **Tạo đơn hàng:**
```javascript
POST /api/orders
Body: {
  buyer: { name, phone, address },
  items: [{ productId, name, price, qty }],
  total: number
}
```

---

## 📁 Files đã tạo/sửa

### **Frontend:**
- ✅ `frontend/src/pages/Cart.jsx` - Trang giỏ hàng mới
- ✅ `frontend/src/App.jsx` - Thêm notification, cart link
- ✅ `frontend/src/main.jsx` - Thêm route /cart

---

## 🎯 Tính năng nổi bật

1. **Notification đẹp** khi thêm vào giỏ
2. **Tính phí ship tự động** theo giá trị đơn
3. **Form validation** đầy đủ
4. **Responsive** hoàn hảo
5. **UX tốt** với animation mượt mà
6. **Giỏ hàng trống** có giao diện đẹp

---

## 💡 Tips

- **Miễn phí ship:** Mua từ 500,000₫ trở lên
- **Xem đơn hàng:** Vào Profile sau khi đặt hàng
- **Giỏ hàng lưu:** Tự động lưu vào localStorage

---

## 🐛 Troubleshooting

### Không thêm được vào giỏ?
- Kiểm tra sản phẩm có `id`, `name`, `price`, `img`
- Xem Console (F12) có lỗi gì không

### Không đặt hàng được?
- Kiểm tra Backend đang chạy
- Điền đầy đủ thông tin bắt buộc
- Kiểm tra API /orders hoạt động

---

**Giỏ hàng đã hoàn thiện! 🎉**
