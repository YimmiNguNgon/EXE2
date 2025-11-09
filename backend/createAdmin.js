const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@grella.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('📧 Email: admin@grella.com');
      console.log('🔑 Password: admin123');
      process.exit();
    }
    
    // Create admin
    const admin = new User({
      name: 'Admin Grella',
      email: 'admin@grella.com',
      password: 'admin123',
      role: 'admin',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam'
    });
    
    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@grella.com');
    console.log('🔑 Password: admin123');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createAdmin();
