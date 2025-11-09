const mongoose = require('mongoose');
const User = require('./models/User');
const axios = require('axios');
require('dotenv').config();

async function diagnose() {
  console.log('\n🔍 CHẨN ĐOÁN HỆ THỐNG ĐĂNG NHẬP\n');
  console.log('═'.repeat(70) + '\n');
  
  // 1. Kiểm tra MongoDB
  console.log('1️⃣  KIỂM TRA MONGODB...');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('   ✅ MongoDB kết nối thành công\n');
  } catch (err) {
    console.log('   ❌ MongoDB không kết nối được!');
    console.log('   💡 Kiểm tra MongoDB đã chạy chưa\n');
    process.exit(1);
  }
  
  // 2. Kiểm tra Users trong DB
  console.log('2️⃣  KIỂM TRA USERS TRONG DATABASE...');
  const users = await User.find();
  console.log(`   Tìm thấy ${users.length} users:\n`);
  
  if (users.length === 0) {
    console.log('   ❌ KHÔNG CÓ USER NÀO!');
    console.log('   💡 Chạy: node fixAllUsers.js\n');
  } else {
    for (const user of users) {
      console.log(`   📧 ${user.email} (${user.role})`);
      
      // Test password
      const passwords = {
        'admin@grella.com': 'admin123',
        'user@grella.com': 'user123',
        'ser@grella.com': 'user123'
      };
      
      const testPass = passwords[user.email] || 'user123';
      const isMatch = await user.comparePassword(testPass);
      console.log(`      Password "${testPass}": ${isMatch ? '✅ OK' : '❌ FAIL'}`);
    }
    console.log('');
  }
  
  // 3. Kiểm tra Backend API
  console.log('3️⃣  KIỂM TRA BACKEND API...');
  try {
    const response = await axios.get('http://localhost:4000/api/products');
    console.log('   ✅ Backend đang chạy (port 4000)\n');
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.log('   ❌ Backend KHÔNG chạy!');
      console.log('   💡 Chạy: node server.js\n');
    } else {
      console.log('   ⚠️  Backend có vấn đề:', err.message + '\n');
    }
  }
  
  // 4. Test Login API
  console.log('4️⃣  TEST LOGIN API...');
  try {
    const loginTest = await axios.post('http://localhost:4000/api/auth/login', {
      email: 'admin@grella.com',
      password: 'admin123'
    });
    
    if (loginTest.data && loginTest.data.token) {
      console.log('   ✅ Login API hoạt động!');
      console.log(`   Token: ${loginTest.data.token.substring(0, 30)}...\n`);
    }
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.log('   ❌ Backend không chạy!\n');
    } else if (err.response) {
      console.log(`   ❌ Login thất bại: ${err.response.data.error}\n`);
    } else {
      console.log(`   ❌ Lỗi: ${err.message}\n`);
    }
  }
  
  // 5. Tổng kết
  console.log('═'.repeat(70));
  console.log('📋 TỔNG KẾT:\n');
  
  const hasUsers = users.length > 0;
  const allPasswordsOk = users.length > 0 && users.every(async u => {
    const testPass = u.email === 'admin@grella.com' ? 'admin123' : 'user123';
    return await u.comparePassword(testPass);
  });
  
  if (hasUsers && allPasswordsOk) {
    console.log('✅ Users: OK');
    console.log('✅ Passwords: OK');
    console.log('\n💡 NẾU VẪN KHÔNG ĐĂNG NHẬP ĐƯỢC:');
    console.log('   1. Kiểm tra Backend đang chạy: node server.js');
    console.log('   2. Kiểm tra Frontend đang chạy: npm run dev');
    console.log('   3. Xóa cache trình duyệt (Ctrl+Shift+Del)');
    console.log('   4. Thử đăng nhập với:');
    console.log('      Email: admin@grella.com');
    console.log('      Password: admin123');
  } else {
    console.log('❌ CÓ VẤN ĐỀ VỚI USERS!');
    console.log('\n💡 GIẢI PHÁP:');
    console.log('   Chạy: node fixAllUsers.js');
  }
  
  console.log('\n' + '═'.repeat(70) + '\n');
  process.exit(0);
}

diagnose();
