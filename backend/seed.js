const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  const items = [
    {
      name: 'Box Hot Wheels',
      price: 280000,
      age: 'Mọi lứa tuổi',
      stock: 15,
      img: ['/images/products/product1.jpg', '/images/products/product2.jpg'],
      desc: 'Hộp quà trong suốt với chủ đề Hot Wheels siêu đẹp. Bao gồm: Xe Hot Wheels collector, KitKat chocolate. Trang trí nơ hồng lãng mạn và rơm trang trí. Kèm lời nhắn đến người thương.',
      features: ['Xe Hot Wheels collector', 'KitKat chocolate', 'Lịch Hot Wheels độc quyền', 'Hộp trong suốt cao cấp', 'Nơ hồng handmade', 'Rơm trang trí', 'Lời nhắn viết tay'],
      category: 'Quà tặng'
    },
    {
      name: 'Box Bóng',
      price: 280000,
      age: 'Mọi lứa tuổi',
      stock: 20,
      img: ['/images/products/product3.jpg', '/images/products/product4.jpg'],
      desc: 'Hộp quà siêu cute với Bóng mềm mại trong hộp trong suốt viền gỗ có đèn LED trang trí. Kèm theo KitKat, Pocky và rơm trang trí màu hồng. Món quà hoàn hảo cho người yêu đam mê thể thao.',
      features: ['Bóng mềm mại chất lượng cao', 'Đèn LED fairy lights', 'KitKat chocolate', 'Hộp trong suốt viền gỗ', 'Rơm trang trí màu hồng', 'Glico Pocky'],
      category: 'Quà tặng'
    },
    {
      name: 'Box Khăn Thêu Tên',
      price: 280000,
      age: 'Mọi lứa tuổi',
      stock: 10,
      img: ['/images/products/product5.jpg', '/images/products/product5.jpg'],
      desc: 'Hộp quà ý nghĩa với khăn đen được thêu tên theo yêu cầu (VD: "Naeni"). Kèm thiệp viết tay chân thành và ảnh polaroid kỷ niệm. Món quà hoàn hảo cho người thân yêu!',
      features: ['Khăn đen cao cấp', 'Thêu tên theo yêu cầu + biểu tượng', 'Thiệp viết tay handmade', 'Ảnh polaroid in màu', 'Hộp quà kraft sang trọng', 'Đóng gói cẩn thận'],
      category: 'Quà tặng'
    }
  ];
  await Product.insertMany(items);
  console.log('✅ Seeded 3 DearHim gift boxes successfully!');
  process.exit();
}
seed();
