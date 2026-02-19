const axios = require('axios');

async function testLoginAPI() {
  console.log('🔍 KIỂM TRA API ĐĂNG NHẬP...\n');

  const testAccounts = [
    { email: 'admin@grella.com', password: 'admin123', name: 'Admin' },
    { email: 'user@grella.com', password: 'user123', name: 'User' },
    { email: 'ser@grella.com', password: 'user123', name: 'Ser User' }
  ];

  console.log('⚠️  LƯU Ý: Backend phải đang chạy trên port 4000!\n');
  console.log('═'.repeat(70) + '\n');

  for (const account of testAccounts) {
    try {
      console.log(`Test đăng nhập: ${account.name}`);
      console.log(`   Email: ${account.email}`);
      console.log(`   Password: ${account.password}`);

      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email: account.email,
        password: account.password
      });

      if (response.data && response.data.token) {
        console.log(`   ✅ THÀNH CÔNG!`);
        console.log(`   Token: ${response.data.token.substring(0, 20)}...`);
        console.log(`   User: ${response.data.user.name} (${response.data.user.role})`);
      } else {
        console.log(`   ❌ THẤT BẠI: Không có token`);
      }
    } catch (err) {
      if (err.code === 'ECONNREFUSED') {
        console.log(`   ❌ LỖI: Backend không chạy!`);
        console.log(`   💡 Chạy: cd backend && node server.js`);
      } else if (err.response) {
        console.log(`   ❌ LỖI: ${err.response.data.error || err.response.statusText}`);
      } else {
        console.log(`   ❌ LỖI: ${err.message}`);
      }
    }
    console.log('');
  }

  console.log('═'.repeat(70));
  console.log('📝 KẾT LUẬN:\n');
  console.log('Nếu tất cả đều ✅ THÀNH CÔNG:');
  console.log('   → Backend hoạt động tốt');
  console.log('   → Users đã được tạo đúng');
  console.log('   → Có thể đăng nhập từ Frontend\n');
  console.log('Nếu có ❌ LỖI:');
  console.log('   → Chạy: node fixAllUsers.js');
  console.log('   → Kiểm tra Backend đang chạy');
  console.log('═'.repeat(70));
}

testLoginAPI();
