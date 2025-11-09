const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createSerUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Kết nối MongoDB thành công\n');
    
    // Kiểm tra user đã tồn tại chưa
    const existing = await User.findOne({ email: 'ser@grella.com' });
    if (existing) {
      console.log('✅ User ser@grella.com đã tồn tại!');
      console.log('📧 Email: ser@grella.com');
      console.log('🔑 Password: user123\n');
      process.exit(0);
    }
    
    // Tạo user mới
    const user = new User({
      name: 'Ser User',
      email: 'ser@grella.com',
      password: 'user123',
      role: 'user',
      phone: '0999888777',
      address: 'Việt Nam'
    });
    
    await user.save();
    
    console.log('✅ Đã tạo user thành công!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email: ser@grella.com');
    console.log('🔑 Password: user123');
    console.log('═══════════════════════════════════════\n');
    console.log('🌐 Bây giờ bạn có thể đăng nhập tại:');
    console.log('   http://localhost:5173/login\n');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

createSerUser();
