@echo off
chcp 65001 >nul
color 0C

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          DỪNG GRELLA - STOP ALL                         ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo 🛑 Đang dừng tất cả services...
echo.

REM Dừng Node.js processes
taskkill /F /IM node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Đã dừng Backend
) else (
    echo ⚠️  Backend không chạy
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ HOÀN TẤT!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
