const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function seedUsers(){
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  
  const users = [
    {
      name: 'Admin Grella',
      email: 'admin@grella.com',
      password: 'admin123',
      role: 'admin',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam'
    },
    {
      name: 'Nguyễn Văn A',
      email: 'user@grella.com',
      password: 'user123',
      role: 'user',
      phone: '0987654321',
      address: 'TP. Hồ Chí Minh, Việt Nam'
    }
  ];
  
  // Use save() instead of insertMany() to trigger password hashing
  for (const userData of users) {
    const user = new User(userData);
    await user.save();
  }
  
  console.log('✅ Seeded 2 users successfully!');
  console.log('📧 Admin: admin@grella.com / admin123');
  console.log('📧 User: user@grella.com / user123');
  process.exit();
}

seedUsers();
