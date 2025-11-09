@echo off
chcp 65001 >nul
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          SỬA LỖI ĐĂNG NHẬP - GRELLA                     ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo 🔧 Đang sửa lỗi đăng nhập...
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Bước 1: Tạo lại users...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
node fixLogin.js
echo.

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo ✅ HOÀN TẤT!
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
    echo 📝 Bây giờ bạn có thể đăng nhập với:
    echo.
    echo    👑 ADMIN:
    echo       Email: admin@grella.com
    echo       Password: admin123
    echo.
    echo    👤 USER:
    echo       Email: user@grella.com
    echo       Password: user123
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo 🌐 Mở trình duyệt: http://localhost:5173/login
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
) else (
    echo.
    echo ❌ CÓ LỖI XẢY RA!
    echo.
    echo 💡 Kiểm tra:
    echo    1. MongoDB đã chạy chưa?
    echo    2. File .env có đúng không?
    echo    3. Backend server đã dừng chưa?
    echo.
)

pause
