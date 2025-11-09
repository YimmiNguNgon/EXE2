const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function fixLogin() {
  try {
    console.log('🔧 BẮT ĐẦU SỬA LỖI ĐĂNG NHẬP...\n');
    
    // Step 1: Connect to MongoDB
    console.log('📡 Bước 1: Kết nối MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Đã kết nối MongoDB\n');
    
    // Step 2: Check existing users
    console.log('👥 Bước 2: Kiểm tra users hiện tại...');
    const existingUsers = await User.find();
    console.log(`   Tìm thấy ${existingUsers.length} users\n`);
    
    // Step 3: Delete all users
    console.log('🗑️  Bước 3: Xóa tất cả users cũ...');
    await User.deleteMany({});
    console.log('✅ Đã xóa users cũ\n');
    
    // Step 4: Create new users
    console.log('➕ Bước 4: Tạo users mới...');
    
    const admin = new User({
      name: 'Admin Grella',
      email: 'admin@grella.com',
      password: 'admin123',
      role: 'admin',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam'
    });
    await admin.save();
    console.log('✅ Đã tạo Admin');
    
    const user = new User({
      name: 'Nguyễn Văn A',
      email: 'user@grella.com',
      password: 'user123',
      role: 'user',
      phone: '0987654321',
      address: 'TP. Hồ Chí Minh, Việt Nam'
    });
    await user.save();
    console.log('✅ Đã tạo User\n');
    
    // Step 5: Test passwords
    console.log('🔐 Bước 5: Test mật khẩu...');
    const testAdmin = await User.findOne({ email: 'admin@grella.com' });
    const testUser = await User.findOne({ email: 'user@grella.com' });
    
    const adminPasswordOk = await testAdmin.comparePassword('admin123');
    const userPasswordOk = await testUser.comparePassword('user123');
    
    console.log(`   Admin password: ${adminPasswordOk ? '✅ OK' : '❌ FAIL'}`);
    console.log(`   User password: ${userPasswordOk ? '✅ OK' : '❌ FAIL'}\n`);
    
    // Step 6: Summary
    console.log('=' .repeat(60));
    console.log('🎉 HOÀN TẤT! Bây giờ bạn có thể đăng nhập với:');
    console.log('=' .repeat(60));
    console.log('\n👑 ADMIN:');
    console.log('   Email: admin@grella.com');
    console.log('   Password: admin123');
    console.log('\n👤 USER:');
    console.log('   Email: user@grella.com');
    console.log('   Password: user123');
    console.log('\n' + '=' .repeat(60));
    console.log('📝 Hướng dẫn:');
    console.log('   1. Mở trình duyệt: http://localhost:5173/login');
    console.log('   2. Nhập email và password ở trên');
    console.log('   3. Click "Đăng nhập"');
    console.log('=' .repeat(60) + '\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ LỖI:', err.message);
    console.error('\n💡 Giải pháp:');
    console.error('   1. Kiểm tra MongoDB đã chạy chưa');
    console.error('   2. Kiểm tra file .env có đúng MONGO_URI không');
    console.error('   3. Thử chạy lại: node fixLogin.js\n');
    process.exit(1);
  }
}

fixLogin();
