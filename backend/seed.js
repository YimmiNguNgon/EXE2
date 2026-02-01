const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  const items = [
    {
      name: 'Hộp quà "Classic Man" ☕',
      price: 450000,
      age: 'Người lớn',
      stock: 25,
      img: '/images/products/classic-man.jpg',
      desc: 'Hộp quà dành cho quý ông yêu thích sự lịch lãm. Bao gồm: Cà phê specialty, sổ tay da cao cấp, bút ký kim loại, và thiệp viết tay.',
      features: ['Cà phê specialty 250g', 'Sổ tay da thật', 'Bút ký cao cấp', 'Thiệp viết tay + ảnh'],
      category: 'Công sở'
    },
    {
      name: 'Hộp quà "Sport Lover" ⚽',
      price: 500000,
      age: 'Người lớn',
      stock: 20,
      img: '/images/products/sport-lover.jpg',
      desc: 'Dành cho những chàng trai yêu thể thao. Bao gồm: Khăn thể thao, bình nước cao cấp, dây đeo tay thể thao, và thiệp động viên.',
      features: ['Khăn thể thao premium', 'Bình nước 750ml', 'Dây đeo tay silicon', 'Thiệp tay chân thành'],
      category: 'Thể thao'
    },
    {
      name: 'Hộp quà "Tech Geek" 💻',
      price: 550000,
      age: 'Người lớn',
      stock: 18,
      img: '/images/products/tech-geek.jpg',
      desc: 'Cho những tín đồ công nghệ. Bao gồm: Đế đỡ laptop, chuột không dây, túi đựng phụ kiện, và thiệp viết tay.',
      features: ['Đế laptop nhôm', 'Chuột wireless', 'Túi phụ kiện canvas', 'Thiệp + ảnh kỷ niệm'],
      category: 'Công nghệ'
    },
    {
      name: 'Hộp quà "Romantic" 💝',
      price: 650000,
      age: 'Người lớn',
      stock: 30,
      img: '/images/products/romantic.jpg',
      desc: 'Hộp quà lãng mạn cho người yêu. Bao gồm: Nến thơm cao cấp, khung ảnh đôi, album ảnh mini, hoa hồng sáp, và thiệp tình yêu viết tay.',
      features: ['Nến thơm pháp', 'Khung ảnh đôi sang trọng', 'Album 20 ảnh', 'Hoa hồng sáp + thiệp tay'],
      category: 'Tình yêu'
    },
    {
      name: 'Hộp quà "Father\'s Pride" 👨',
      price: 700000,
      age: 'Người lớn',
      stock: 15,
      img: '/images/products/father-pride.jpg',
      desc: 'Món quà tri ân dành cho bố. Bao gồm: Ví da bò thật, thắt lưng da, trà cao cấp, và thiệp cảm ơn chân thành.',
      features: ['Ví da bò Italy', 'Thắt lưng da thật', 'Trà ô long 100g', 'Thiệp viết tay + ảnh gia đình'],
      category: 'Gia đình'
    },
    {
      name: 'Hộp quà "Minimalist" 🎨',
      price: 400000,
      age: 'Người lớn',
      stock: 22,
      img: '/images/products/minimalist.jpg',
      desc: 'Phong cách tối giản, sang trọng. Bao gồm: Móc khóa da, ví card nhỏ gọn, bút bi cao cấp, và thiệp viết tay.',
      features: ['Móc khóa da thật', 'Ví card tối giản', 'Bút bi Parker', 'Thiệp viết tay'],
      category: 'Phong cách'
    },
    {
      name: 'Hộp quà "Custom Dream" ✨',
      price: 800000,
      age: 'Người lớn',
      stock: 10,
      img: '/images/products/custom-dream.jpg',
      desc: 'Hộp quà tùy chỉnh hoàn toàn theo ý bạn. Chọn sản phẩm yêu thích, thiết kế thiệp riêng, chọn ảnh in đẹp - Tạo nên món quà độc nhất!',
      features: ['Tự chọn 5-7 món quà', 'Thiết kế thiệp theo yêu cầu', 'In ảnh chất lượng cao', 'Đóng gói cao cấp nhất'],
      category: 'Cao cấp'
    }
  ];
  await Product.insertMany(items);
  console.log('✅ Seeded 7 DearHim gift boxes successfully!');
  process.exit();
}
seed();
