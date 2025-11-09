@echo off
chcp 65001 >nul
color 0B

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          CHẨN ĐOÁN LỖI ĐĂNG NHẬP                        ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

cd backend
node diagnose.js

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 💡 HÀNH ĐỘNG TIẾP THEO:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Nếu thấy vấn đề, chạy:
echo    1. FIX_LOGIN_NOW.bat (sửa users)
echo    2. START.bat (khởi động)
echo.
pause
