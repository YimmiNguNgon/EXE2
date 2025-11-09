@echo off
chcp 65001 >nul
color 0E

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          SỬA LỖI ĐĂNG NHẬP - FIX LOGIN                  ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo 🔧 Đang sửa lỗi đăng nhập cho Admin và User...
echo.

cd backend
node fixAllUsers.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo ✅ ĐÃ SỬA XONG!
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
    echo 💡 BÂY GIỜ:
    echo    1. Chạy file START.bat để khởi động
    echo    2. Hoặc chạy thủ công:
    echo       - Backend: cd backend ^&^& node server.js
    echo       - Frontend: cd frontend ^&^& npm run dev
    echo.
    echo 🔐 Đăng nhập với:
    echo    Admin: admin@grella.com / admin123
    echo    User: user@grella.com / user123
    echo    Ser: ser@grella.com / user123
    echo.
) else (
    echo.
    echo ❌ CÓ LỖI! Kiểm tra:
    echo    1. MongoDB đã chạy chưa?
    echo    2. File .env có đúng không?
    echo.
)

pause
