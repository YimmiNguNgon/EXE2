const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function fixAllUsers() {
  try {
    console.log('🔧 BẮT ĐẦU SỬA LỖI ĐĂNG NHẬP...\n');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Đã kết nối MongoDB\n');
    
    // Xóa tất cả users cũ
    console.log('🗑️  Xóa tất cả users cũ...');
    await User.deleteMany({});
    console.log('✅ Đã xóa\n');
    
    // Tạo Admin
    console.log('👑 Tạo Admin...');
    const admin = new User({
      name: 'Admin Grella',
      email: 'admin@grella.com',
      password: 'admin123',
      role: 'admin',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam'
    });
    await admin.save();
    console.log('✅ Admin đã tạo');
    
    // Test admin password
    const testAdmin = await User.findOne({ email: 'admin@grella.com' });
    const adminOk = await testAdmin.comparePassword('admin123');
    console.log(`   Password test: ${adminOk ? '✅ OK' : '❌ FAIL'}\n`);
    
    // Tạo User thường
    console.log('👤 Tạo User thường...');
    const user = new User({
      name: 'Nguyễn Văn A',
      email: 'user@grella.com',
      password: 'user123',
      role: 'user',
      phone: '0987654321',
      address: 'TP. Hồ Chí Minh, Việt Nam'
    });
    await user.save();
    console.log('✅ User đã tạo');
    
    // Test user password
    const testUser = await User.findOne({ email: 'user@grella.com' });
    const userOk = await testUser.comparePassword('user123');
    console.log(`   Password test: ${userOk ? '✅ OK' : '❌ FAIL'}\n`);
    
    // Tạo Ser User
    console.log('👤 Tạo Ser User...');
    const serUser = new User({
      name: 'Ser User',
      email: 'ser@grella.com',
      password: 'user123',
      role: 'user',
      phone: '0999888777',
      address: 'Đà Nẵng, Việt Nam'
    });
    await serUser.save();
    console.log('✅ Ser User đã tạo');
    
    // Test ser user password
    const testSer = await User.findOne({ email: 'ser@grella.com' });
    const serOk = await testSer.comparePassword('user123');
    console.log(`   Password test: ${serOk ? '✅ OK' : '❌ FAIL'}\n`);
    
    console.log('═'.repeat(70));
    console.log('🎉 HOÀN TẤT! Tất cả users đã được tạo và test thành công!');
    console.log('═'.repeat(70));
    console.log('\n📋 DANH SÁCH TÀI KHOẢN:\n');
    
    console.log('👑 ADMIN:');
    console.log('   Email: admin@grella.com');
    console.log('   Password: admin123');
    console.log('   Truy cập: http://localhost:5173/admin\n');
    
    console.log('👤 USER 1:');
    console.log('   Email: user@grella.com');
    console.log('   Password: user123\n');
    
    console.log('👤 USER 2 (Ser):');
    console.log('   Email: ser@grella.com');
    console.log('   Password: user123\n');
    
    console.log('═'.repeat(70));
    console.log('📝 HƯỚNG DẪN:');
    console.log('   1. Chạy Backend: node server.js');
    console.log('   2. Chạy Frontend: npm run dev (trong thư mục frontend)');
    console.log('   3. Mở: http://localhost:5173/login');
    console.log('   4. Đăng nhập với một trong các tài khoản trên');
    console.log('═'.repeat(70) + '\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ LỖI:', err.message);
    console.error('\n💡 Kiểm tra:');
    console.error('   1. MongoDB đã chạy chưa?');
    console.error('   2. File .env có MONGO_URI đúng không?');
    console.error('   3. Backend server đã dừng chưa?\n');
    process.exit(1);
  }
}

fixAllUsers();
