const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const users = await User.find();
    
    if (users.length === 0) {
      console.log('❌ Không có user nào trong database!');
      console.log('📝 Chạy lệnh: node seedUsers.js để tạo users\n');
    } else {
      console.log(`✅ Có ${users.length} users trong database:\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Phone: ${user.phone || 'N/A'}`);
        console.log(`   Created: ${user.createdAt}\n`);
      });
      
      console.log('📧 Thông tin đăng nhập:');
      console.log('Admin: admin@grella.com / admin123');
      console.log('User: user@grella.com / user123\n');
    }
    
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkUsers();
