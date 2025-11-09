@echo off
chcp 65001 >nul
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          KHỞI ĐỘNG GRELLA - AUTO START                  ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo 🚀 Đang khởi động Backend và Frontend...
echo.

REM Khởi động Backend trong window mới
start "Grella Backend" cmd /k "cd backend && node server.js"
echo ✅ Backend đang khởi động... (port 4000)

REM Đợi 3 giây
timeout /t 3 /nobreak >nul

REM Khởi động Frontend trong window mới
start "Grella Frontend" cmd /k "cd frontend && npm run dev"
echo ✅ Frontend đang khởi động... (port 5173)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎉 HOÀN TẤT!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📝 Thông tin:
echo    Backend: http://localhost:4000
echo    Frontend: http://localhost:5173
echo.
echo 🔐 Đăng nhập với:
echo    Email: ser@grella.com
echo    Password: user123
echo.
echo    Hoặc Admin:
echo    Email: admin@grella.com
echo    Password: admin123
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 💡 Đợi 10 giây rồi mở trình duyệt...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Đợi 10 giây để server khởi động
timeout /t 10 /nobreak

REM Mở trình duyệt
start http://localhost:5173/login

echo.
echo ✅ Đã mở trình duyệt!
echo.
echo 📌 LƯU Ý: Đừng đóng window này!
echo.
pause
