const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  const items = [
    { 
      name: 'Grella - Vườn ngôn ngữ', 
      price: 400000, 
      age: '3-5', 
      stock: 35,
      img: '/images/products/alphabet-tree.jpg', 
      desc: 'Bộ đồ chơi học chữ cái với 35 chi tiết, giúp bé làm quen với ngôn ngữ qua trò chơi tương tác. Thiết kế cây chữ cái độc đáo, kích thích tư duy sáng tạo và khả năng nhận biết chữ cái.',
      features: ['35 chi tiết đa dạng', 'Học chữ cái qua trò chơi', 'Phát triển ngôn ngữ', 'Vật liệu từ bã cà phê'],
      category: 'Ngôn ngữ'
    },
    { 
      name: 'Grella - Cây toán học', 
      price: 420000, 
      age: '3-5', 
      stock: 40,
      img: '/images/products/counting-board.jpg', 
      desc: 'Bộ đồ chơi toán học với 40 chi tiết, giúp bé học đếm số, nhận biết màu sắc và hình dạng. Phát triển tư duy logic và kỹ năng toán học cơ bản qua hoạt động thực hành.',
      features: ['40 chi tiết phong phú', 'Học đếm và tính toán', 'Nhận biết màu sắc', 'An toàn cho trẻ'],
      category: 'Toán học'
    },
    { 
      name: 'Grella - Khám phá vũ trụ', 
      price: 450000, 
      age: '3-5', 
      stock: 30,
      img: '/images/products/solar-system.jpg', 
      desc: 'Bộ đồ chơi khám phá vũ trụ với 30 chi tiết, giúp bé tìm hiểu về hệ mặt trời, hành tinh và không gian. Kích thích trí tưởng tượng và niềm đam mê khoa học từ nhỏ.',
      features: ['30 chi tiết vũ trụ', 'Học về hệ mặt trời', 'Phát triển tư duy khoa học', 'Chất liệu sinh học'],
      category: 'Khoa học'
    },
    { 
      name: 'Grella - Kiến trúc sư nhỏ', 
      price: 800000, 
      age: '3-5', 
      stock: 60,
      img: '/images/products/castle-blocks.jpg', 
      desc: 'Bộ xếp hình lâu đài với 60 chi tiết đa dạng, giúp bé phát triển khả năng không gian, sáng tạo và kỹ năng xây dựng. Thiết kế màu sắc pastel dịu nhẹ, an toàn tuyệt đối.',
      features: ['60 chi tiết xếp hình', 'Phát triển tư duy không gian', 'Kích thích sáng tạo', 'Màu sắc pastel dịu mắt'],
      category: 'Xây dựng'
    },
    { 
      name: 'Grella - Hệ sinh thái trí tuệ', 
      price: 1000000, 
      age: '3-5', 
      stock: 80,
      img: '/images/products/math-abacus.jpg', 
      desc: 'Bộ đồ chơi toàn diện với 80 chi tiết, kết hợp toán học, logic và kỹ năng giải quyết vấn đề. Sản phẩm cao cấp nhất của Grella, phát triển đa chiều cho trẻ.',
      features: ['80 chi tiết cao cấp', 'Phát triển đa kỹ năng', 'Tích hợp nhiều hoạt động', 'Chất lượng premium'],
      category: 'Tổng hợp'
    }
  ];
  await Product.insertMany(items);
  console.log('✅ Seeded 5 Grella products successfully!');
  process.exit();
}
seed();
