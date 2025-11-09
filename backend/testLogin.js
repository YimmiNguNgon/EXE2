const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check if users exist
    const users = await User.find({});
    console.log(`\n📊 Found ${users.length} users in database:`);
    
    for (const user of users) {
      console.log(`\n👤 User: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
      
      // Test password comparison
      const testPassword = user.email === 'admin@grella.com' ? 'admin123' : 'user123';
      const isMatch = await user.comparePassword(testPassword);
      console.log(`   Password "${testPassword}" matches: ${isMatch ? '✅ YES' : '❌ NO'}`);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🔐 Login Credentials:');
    console.log('Admin: admin@grella.com / admin123');
    console.log('User: user@grella.com / user123');
    console.log('='.repeat(50));
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    process.exit();
  }
}

testLogin();
