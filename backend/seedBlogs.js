const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

async function seedBlogs() {
  await mongoose.connect(process.env.MONGO_URI);
  await Blog.deleteMany({});

  const blogs = [
    {
      title: 'Làm sao để chọn quà cho nam giới? ',
      slug: 'lam-sao-de-chon-qua-cho-nam-gioi',
      excerpt: 'Bí quyết chọn món quà ý nghĩa cho "anh ấy" mà không cần đau đầu!',
      content: `
        <h2>Tặng quà cho nam giới - Có gì khó đâu! </h2>
        <p>Nhiều bạn gái hay lo lắng không biết tặng gì cho người yêu, chồng, bố, anh trai... Nhưng thực ra, chọn quà cho nam giới không hề khó như bạn nghĩ đâu nhé!</p>
        
        <h2>Bí quyết #1: Lắng nghe sở thích</h2>
        <p>Anh ấy thích gì? Đam mê nào? Môn thể thao nào? Nghe có vẻ đơn giản nhưng đây là chìa khóa quan trọng nhất!</p>
        <ul>
          <li>Thích công nghệ → Gadgets, phụ kiện tech</li>
          <li>Yêu thể thao → Dụng cụ tập, đồ thể thao</li>
          <li>Đam mê cà phê → Bộ pha cà phê, cà phê specialty</li>
          <li>Thích phong cách → Quần áo, phụ kiện thời trang</li>
        </ul>
        
        <h2>Bí quyết #2: Cá nhân hóa món quà</h2>
        <p>Đừng chỉ mua một món quà, hãy biến nó trở nên <strong>đặc biệt</strong>:</p>
        <ul>
          <li> Thêm lời nhắn viết tay chân thành</li>
          <li> Kèm ảnh kỷ niệm của hai người</li>
          <li> Khắc tên hoặc ngày đặc biệt</li>
          <li> Đóng gói đẹp mắt, tinh tế</li>
        </ul>
        
        <h2>Bí quyết #3: Đừng lo về giá cả!</h2>
        <p>Món quà ý nghĩa không nhất thiết phải đắt. Điều quan trọng là <strong>sự chân thành</strong> và <strong>tâm ý</strong> bạn dành cho anh ấy.</p>
        
        <h2>DearHim - Giải pháp hoàn hảo </h2>
        <p>Hộp quà DearHim đã chuẩn bị sẵn mọi thứ cho bạn: quà chọn lọc, thiệp viết tay, ảnh in đẹp. Bạn chỉ cần chọn và trao đi yêu thương!</p>
        
        <p><strong>Nhớ nhé: Mon quà tuyệt vời nhất là sự quan tâm và yêu thương! </strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      category: 'Hướng dẫn',
      tags: ['Chọn quà', 'Nam giới', 'Hướng dẫn'],
      readTime: 5
    },
    {
      title: '10 ý tưởng quà sinh nhật cho bạn trai ',
      slug: '10-y-tuong-qua-sinh-nhat-cho-ban-trai',
      excerpt: 'Gợi ý món quà sinh nhật khiến anh ấy bất ngờ và hạnh phúc!',
      content: `
        <h2>Sinh nhật anh ấy sắp đến rồi! </h2>
        <p>Đừng để đến phút chót mới lo! Đây là 10 ý tưởng quà sinh nhật chắc chắn làm anh ấy thích:</p>
        
        <h2>1. Đồng hồ thời trang </h2>
        <p>Luôn là lựa chọn an toàn và sang trọng. Chọn kiểu dáng phù hợp với phong cách của anh ấy.</p>
        
        <h2>2. Ví da cao cấp </h2>
        <p>Thực dụng và tinh tế. Có thể khắc tên hoặc chữ viết tắt để cá nhân hóa.</p>
        
        <h2>3. Bộ dưỡng da nam </h2>
        <p>Giúp anh ấy chăm sóc bản thân. Chọn thương hiệu cho da nam.</p>
        
        <h2>4. Tai nghe không dây </h2>
        <p>Nếu anh ấy yêu âm nhạc hoặc thường xuyên họp online.</p>
        
        <h2>5. Bộ cà phê specialty </h2>
        <p>Cho những tín đồ cà phê. Kèm theo bộ pha cà phê nữa càng tuyệt!</p>
        
        <h2>6. Áo thun/Hoodie đẹp </h2>
        <p>Chọn brand anh ấy yêu thích hoặc thiết kê custom riêng.</p>
        
        <h2>7. Nước hoa nam </h2>
        <p>Mùi hương anh ấy thích, hoặc mùi mà bạn muốn anh ấy dùng.</p>
        
        <h2>8. Phụ kiện công nghệ </h2>
        <p>Sạc dự phòng, đế sạc không dây, case điện thoại đẹp...</p>
        
        <h2>9. Voucher trải nghiệm </h2>
        <p>Massage, du lịch ngắn ngày, hoặc hoạt động anh ấy thích.</p>
        
        <h2>10. Hộp quà DearHim </h2>
        <p>Kết hợp nhiều món nhỏ xinh, thiệp viết tay, ảnh kỷ niệm - Trọn vẹn tâm ý!</p>
        
        <h2>Lưu ý quan trọng:</h2>
        <ul>
          <li> Đóng gói đẹp, tạo bất ngờ</li>
          <li> Đừng quên thiệp viết tay</li>
          <li> Chụp ảnh để lưu lại khoảnh khắc</li>
          <li> Trao tận tay với nụ cười thật tươi!</li>
        </ul>
        
        <p><strong>Món quà nào cũng đẹp, miễn là từ trái tim bạn! </strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
      category: 'Ý tưởng',
      tags: ['Sinh nhật', 'Bạn trai', 'Ý tưởng'],
      readTime: 6
    },
    {
      title: 'Quà kỷ niệm - Làm sao cho ý nghĩa?',
      slug: 'qua-ky-niem-lam-sao-cho-y-nghia',
      excerpt: 'Bí quyết chọn quà kỷ niệm chạm đến trái tim anh ấy.',
      content: `
        <h2>Kỷ niệm đáng nhớ cần món quà đặc biệt</h2>
        <p>Ngày kỷ niệm không chỉ là một ngày bình thường. Đó là lúc bạn nhắc anh ấy nhớ về những khoảnh khắc đẹp nhất!</p>
        
        <h2>Những dịp kỷ niệm đặc biệt:</h2>
        <ul>
          <li>Kỷ niệm ngày yêu nhau</li>
          <li>Kỷ niệm ngày cầu hôn</li>
          <li>Kỷ niệm ngày quen biết</li>
          <li>Kỷ niệm ngày cưới (cho các cặp đã kết hôn)</li>
        </ul>
        
        <h2>Món quà kỷ niệm nên có gì?</h2>
        
        <h3>1. Yếu tố "chúng ta"</h3>
        <p>Món quà cần gắn liền với cả hai người:</p>
        <ul>
          <li>Album ảnh kỷ niệm từ lúc yêu đến giờ</li>
          <li>Khung ảnh với tấm ảnh đẹp nhất</li>
          <li>Đồ đôi tinh tế (đồng hồ, vòng, nhẫn...)</li>
        </ul>
        
        <h3>2. Thông điệp tình cảm</h3>
        <p>Lời nhắn chân thành từ trái tim:</p>
        <ul>
          <li>Viết thư tay dài kể về cảm xúc</li>
          <li>Ghi lại 100 lý do yêu anh ấy</li>
          <li>Video montage những khoảnh khắc đẹp</li>
        </ul>
        
        <h3>3. Sự bất ngờ</h3>
        <p>Tạo khoảnh khắc anh ấy không ngờ tới:</p>
        <ul>
          <li>Tổ chức tiệc nhỏ với bạn bè</li>
          <li>Đưa anh ấy đi nơi đầu tiên gặp nhau</li>
          <li>Chuẩn bị bữa tối lãng mạn tại nhà</li>
        </ul>
        
        <h2>Ý tưởng quà kỷ niệm cụ thể:</h2>
        
        <h3>Cho năm đầu tiên 1️⃣:</h3>
        <p>Hộp quà nhỏ xinh với ảnh, thiệp tay và món quà anh ấy thích.</p>
        
        <h3>Cho 2-3 năm:</h3>
        <p>Du lịch ngắn ngày, trải nghiệm mới cùng nhau.</p>
        
        <h3>Cho 5 năm trở lên:</h3>
        <p>Món quà giá trị hơn: đồng hồ, trang sức, hoặc đồ công nghệ cao cấp.</p>
        
        <h2>DearHim - Hộp quà kỷ niệm hoàn hảo</h2>
        <p>DearHim giúp bạn tạo hộp quà kỷ niệm với:</p>
        <ul>
          <li>Ảnh in chất lượng cao của hai người</li>
          <li>Thiệp viết tay thật tình cảm</li>
          <li>Món quà anh ấy yêu thích</li>
          <li>Đóng gói sang trọng, tinh tế</li>
        </ul>
        
        <p><strong>Kỷ niệm đẹp cần được ghi nhận - Hãy trao anh ấy món quà từ trái tim!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      category: 'Ý tưởng',
      tags: ['Kỷ niệm', 'Ý nghĩa', 'Tình yêu'],
      readTime: 7
    },
    {
      title: 'Quà tặng bố - Món quà cho người hùng',
      slug: 'qua-tang-bo-mon-qua-cho-nguoi-hung',
      excerpt: 'Gợi ý quà tặng thể hiện lòng biết ơn với bố.',
      content: `
        <h2>Bố - Người đàn ông quan trọng nhất</h2>
        <p>Bố là người đàn ông đầu tiên trong cuộc đời mỗi người. Nhưng thường thì chúng ta không biết tặng bố gì cho hợp...</p>
        
        <h2>Tặng quà bố vào dịp nào?</h2>
        <ul>
          <li>Sinh nhật bố</li>
          <li>Ngày của Cha</li>
          <li>Tết, Lễ lớn</li>
          <li>Bất cứ khi nào bạn muốn!</li>
        </ul>
        
        <h2>Bố thường thích gì?</h2>
        
        <h3>1. Đồ thực dụng</h3>
        <p>Bố thường ít khi mua sắm cho bản thân:</p>
        <ul>
          <li>Áo sơ mi, polo chất lượng</li>
          <li>Ví da bò thật</li>
          <li>Dây nịt da</li>
          <li>Giày da lịch sự</li>
        </ul>
        
        <h3>2. Sức khỏe</h3>
        <p>Bố đang già đi, cần chăm sóc sức khỏe:</p>
        <ul>
          <li>Máy đo huyết áp</li>
          <li>Thực phẩm chức năng</li>
          <li>Đồ tập thể dục</li>
          <li>Voucher massage, spa</li>
        </ul>
        
        <h3>3. Sở thích riêng</h3>
        <p>Bố bạn thích gì?</p>
        <ul>
          <li>Golf → Gậy, bóng, phụ kiện golf</li>
          <li>Câu cá → Cần câu, phụ kiện</li>
          <li>Đọc sách → Sách hay, Kindle</li>
          <li>Âm nhạc → Loa, tai nghe</li>
        </ul>
        
        <h2>Món quà tinh thần</h2>
        <p>Đôi khi bố cần lời nói yêu thương hơn là quà:</p>
        <ul>
          <li>Viết thư cảm ơn bố</li>
          <li>Dành thời gian ăn tối cùng bố</li>
          <li>Chụp ảnh gia đình</li>
          <li>Kể cho bố nghe về cuộc sống</li>
        </ul>
        
        <h2>Gợi ý cụ thể theo ngân sách:</h2>
        
        <h3>Dưới 500k:</h3>
        <p>Áo polo, ví nhỏ, thắt lưng, nước hoa</p>
        
        <h3>500k - 1tr:</h3>
        <p>Đồng hồ đẹp, giày da, túi đựng laptop</p>
        
        <h3>Trên 1tr:</h3>
        <p>Điện thoại, máy tính bảng, đồng hồ cao cấp</p>
        
        <h2>Hộp quà DearHim cho bố</h2>
        <p>DearHim có hộp quà đặc biệt cho bố với:</p>
        <ul>
          <li>Quà chọn lọc theo sở thích bố</li>
          <li>Thiệp viết tay của con</li>
          <li>Ảnh gia đình đẹp</li>
          <li>Tất cả đóng gói tinh tế</li>
        </ul>
        
        <p><strong>Bố không cần quà đắt tiền - Bố chỉ cần tình yêu thương của con!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?auto=format&fit=crop&w=800&q=80',
      category: 'Gia đình',
      tags: ['Bố', 'Gia đình', 'Ngày của Cha'],
      readTime: 6
    },
    {
      title: 'Cách viết thiệp tay chạm đến trái tim',
      slug: 'cach-viet-thiep-tay-cham-den-trai-tim',
      excerpt: 'Bí quyết viết lời nhắn khiến anh ấy xúc động.',
      content: `
        <h2>Sức mạnh của lời viết tay</h2>
        <p>Trong thời đại digital, một tấm thiệp viết tay trở nên <strong>vô cùng quý giá</strong>. Nó cho thấy bạn đã dành thời gian và tâm huyết thật sự.</p>
        
        <h2>Tại sao phải viết tay?</h2>
        <ul>
          <li>Chân thành, chạm đến cảm xúc</li>
          <li>Cho thấy bạn đã dành thời gian</li>
          <li>Có thể giữ lại mãi mãi</li>
          <li>Làm món quà thêm ý nghĩa</li>
        </ul>
        
        <h2>Cấu trúc một tấm thiệp hay:</h2>
        
        <h3>1. Lời mở đầu (Dear... / Gửi...)</h3>
        <p>Gọi tên một cách trìu mến:</p>
        <ul>
          <li>\"Gửi anh yêu của em,\"</li>
          <li>\"Gửi người đàn ông em yêu,\"</li>
          <li>\"Dear my love,\"</li>
        </ul>
        
        <h3>2. Nội dung chính</h3>
        <p>Nói lên điều bạn muốn:</p>
        <ul>
          <li>Cảm ơn anh ấy vì điều gì</li>
          <li>Kể lại kỷ niệm đẹp</li>
          <li>Nói lên cảm xúc của bạn</li>
          <li>Ước nguyện cho tương lai</li>
        </ul>
        
        <h3>3. Lời kết</h3>
        <p>Kết thúc thật ngọt ngào:</p>
        <ul>
          <li>\"Yêu anh nhiều lắm!\"</li>
          <li>\"Forever yours\"</li>
          <li>\"Love you to the moon and back\"</li>
        </ul>
        
        <h2>Ví dụ cụ thể:</h2>
        
        <h3>Thiệp sinh nhật:</h3>
        <p style="font-style: italic; padding: 15px; background: #f8f8f8; border-left: 3px solid #d4af37;">
        \"Gửi anh yêu,<br><br>
        Chúc mừng sinh nhật người đàn ông tuyệt vời nhất! Cảm ơn anh vì đã luôn bên em, động viên em mỗi ngày. Em mong anh sẽ luôn khỏe mạnh, hạnh phúc, và đạt được mọi ước mơ.<br><br>
        Yêu anh rất nhiều!<br>
        Em của anh\"
        </p>
        
        <h3>Thiệp kỷ niệm:</h3>
        <p style="font-style: italic; padding: 15px; background: #f8f8f8; border-left: 3px solid #d4af37;">
        \"Anh yêu,<br><br>
        2 năm bên nhau thật nhanh nhỉ? Em vẫn nhớ như in ngày đầu tiên gặp anh. Từ một anh trai lạ lẫm, giờ anh đã là tất cả của em. Cảm ơn anh vì tất cả những gì anh đã làm cho em.<br><br>
        Mong chúng ta sẽ luôn bên nhau như thế này!<br>
        Em yêu anh\"
        </p>
        
        <h2>Mẹo nhỏ khi viết:</h2>
        <ul>
          <li>Viết từ trái tim, đừng copy paste</li>
          <li>Kể chuyện riêng của hai người</li>
          <li>Dùng bút đẹp, viết thật tay</li>
          <li>Nếu viết sai, viết lại - đừng xóa</li>
          <li>Có thể vẽ thêm hình nhỏ xinh</li>
        </ul>
        
        <h2>Điều KHÔNG nên làm:</h2>
        <ul>
          <li>Viết cho có,敷衍了事</li>
          <li>Copy từ internet</li>
          <li>Viết quá chung chung</li>
          <li>In ra thay vì viết tay</li>
        </ul>
        
        <h2>DearHim - Thiệp viết tay kèm trong mỗi hộp quà</h2>
        <p>Mỗi hộp quà DearHim đều có tấm thiệp viết tay từ bạn, được chúng tôi viết đẹp theo lời bạn muốn gửi!</p>
        
        <p><strong>Lời viết tay luôn chạm đến trái tim hơn tin nhắn!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      category: 'Hướng dẫn',
      tags: ['Thiệp tay', 'Viết lời', 'Cảm xúc'],
      readTime: 5
    },
    {
      title: 'Quà Tết cho người yêu - Ý tưởng hay 2025',
      slug: 'qua-tet-cho-nguoi-yeu-y-tuong-hay',
      excerpt: 'Gợi ý quà Tết độc đáo khiến anh ấy nhớ mãi.',
      content: `
        <h2>Tết - Dịp tặng quà đặc biệt</h2>
        <p>Tết không chỉ là dịp sum họp gia đình mà còn là lúc thể hiện tình cảm với người yêu. Vậy nên tặng gì cho anh ấy đây?</p>
        
        <h2>Ý tưởng quà Tết truyền thống:</h2>
        
        <h3>1. Áo dài cặp</h3>
        <p>Mặc áo dài đi chúc Tết rất đẹp! Chọn màu sắc hợp với cả hai.</p>
        
        <h3>2. Rượu cao cấp</h3>
        <p>Nếu anh ấy uống rượu, tặng chai rượu tốt để anh ấy nhâm nhi dịp Tết.</p>
        
        <h3>3. Trà ngon</h3>
        <p>Bộ trà cao cấp cho anh ấy thưởng thức hoặc biếu bố mẹ.</p>
        
        <h3>4. Bánh kẹo đặc biệt</h3>
        <p>Hộp bánh kẹo cao cấp, đóng gói đẹp.</p>
        
        <h2>Ý tưởng quà Tết hiện đại:</h2>
        
        <h3>5. Đồ điện tử mới</h3>
        <p>AirPods, smart watch, hoặc gadget công nghệ anh ấy thích.</p>
        
        <h3>6. Quần áo mới</h3>
        <p>Set đồ mới sành điệu cho năm mới, năm mới diện đồ mới!</p>
        
        <h3>7. Giày/Dép cao cấp</h3>
        <p>Đôi giày/dép anh ấy đang muốn nhưng chưa mua.</p>
        
        <h3>8. Thẻ quà tặng</h3>
        <p>Voucher từ shop anh ấy yêu thích để anh ấy tự chọn.</p>
        
        <h2>Ý tưởng quà Tết sáng tạo:</h2>
        
        <h3>9. Du lịch ngắn ngày</h3>
        <p>Đặt tour đi chơi sau Tết - kỷ niệm đầu năm!</p>
        
        <h3>10. Hộp quà tự tay làm</h3>
        <p>Ghép nhiều món nhỏ anh ấy thích + thiệp Tết tự viết.</p>
        
        <h2>Đặc biệt: Hộp quà Tết DearHim</h2>
        <p>DearHim có hộp quà Tết đặc biệt với:</p>
        <ul>
          <li>Quà chọn lọc cao cấp</li>
          <li>Thiệp Tết viết tay</li>
          <li>Ảnh kỷ niệm đẹp</li>
          <li>Đóng gói màu đỏ may mắn</li>
          <li>Hoa trang trí tết</li>
        </ul>
        
        <h2>Lưu ý khi chọn quà Tết:</h2>
        <ul>
          <li>Màu đỏ, vàng mang ý nghĩa tốt lành</li>
          <li>Đừng quá tiết kiệm - Tết năm mới mà!</li>
          <li>Đóng gói đẹp, có túi xách sang</li>
          <li>Kèm lời chúc tết ngọt ngào</li>
        </ul>
        
        <h2>Lời chúc Tết cho anh ấy:</h2>
        <p style="font-style: italic; padding: 15px; background: #f8f8f8; border-left: 3px solid #d4af37;">
        \"Anh yêu,<br><br>
        Chúc anh năm mới an khang thịnh vượng, luôn khỏe mạnh và thành công! Em mong năm mới này chúng ta sẽ có thêm nhiều kỷ niệm đẹp bên nhau.<br><br>
        Yêu anh!\"
        </p>
        
        <p><strong>Tết đến - Hãy tặng anh ấy món quà thật ý nghĩa!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1543086123-36a57732f66a?auto=format&fit=crop&w=800&q=80',
      category: 'Dịp đặc biệt',
      tags: ['Tết', 'Năm mới', 'Ý tưởng'],
      readTime: 6
    },
    {
      title: 'Lời cảm ơn đẹp nhất dành cho "anh ấy"',
      slug: 'loi-cam-on-dep-nhat-danh-cho-anh-ay',
      excerpt: 'Những cách nói cảm ơn chân thành và ý nghĩa.',
      content: `
        <h2>Đàn ông cũng cần được cảm ơn</h2>
        <p>Đàn ông thường ít thể hiện cảm xúc, nhưng họ cũng cần được ghi nhận và cảm ơn. Đừng nghĩ là họ làm mọi  việc lý đương nhiên nhé!</p>
        
        <h2>Nên cảm ơn "anh ấy" vì những gì?</h2>
        
        <h3>Vì sự bảo vệ</h3>
        <p>\"Cảm ơn anh vì luôn là chỗ dựa vững chắc của em\"</p>
        
        <h3>Vì tình yêu thương</h3>
        <p>\"Cảm ơn anh vì đã yêu em với tất cả trái tim\"</p>
        
        <h3>Vì sự hỗ trợ</h3>
        <p>\"Cảm ơn anh vì luôn ủng hộ ước mơ của em\"</p>
        
        <h3>Vì sự kiên nhẫn</h3>
        <p>\"Cảm ơn anh vì đã chịu đựng lúc em không vui\"</p>
        
        <h3>Vì sự nỗ lực</h3>
        <p>\"Cảm ơn anh vì luôn cố gắng vì chúng ta\"</p>
        
        <h2>Cách nói cảm ơn ý nghĩa:</h2>
        
        <h3>1. Nói trực tiếp</h3>
        <p>Nhìn vào mắt anh ấy và nói \"Anh biết không, em thật sự cảm ơn anh vì...\"</p>
        
        <h3>2. Viết thư tay</h3>
        <p>Viết một lá thư cảm ơn dài, kể lại những điều anh ấy đã làm cho mình.</p>
        
        <h3>3. Hành động thay lời nói</h3>
        <p>Làm điều gì đó đặc biệt cho anh ấy:</p>
        <ul>
          <li>Nấu món anh ấy thích</li>
          <li>Massage cho anh ấy sau ngày làm việc</li>
          <li>Tặng món quà anh ấy muốn</li>
        </ul>
        
        <h3>4. Chia sẻ công khai</h3>
        <p>Post lên social media về anh ấy (nếu anh ấy OK với điều này).</p>
        
        <h2>Mẫu lời cảm ơn cụ thể:</h2>
        
        <h3>Cảm ơn người yêu:</h3>
        <p style="font-style: italic; padding: 15px; background: #f8f8f8; border-left: 3px solid #d4af37;">
        \"Anh yêu,<br><br>
        Em muốn nói với anh rằng, em thật sự biết ơn vì có anh. Cảm ơn anh vì đã luôn bên em, kiên nhẫn với em khi em làm bậy, và yêu em với tất cả ưu nhược điểm. Có anh, cuộc sống em ý nghĩa hơn rất nhiều.<br><br>
        Yêu và cảm ơn anh nhiều lắm!\"
        </p>
        
        <h3>Cảm ơn bố:</h3>
        <p style="font-style: italic; padding: 15px; background: #f8f8f8; border-left: 3px solid #d4af37;">
        \"Bố thân yêu,<br><br>
        Con muốn nói với bố rằng, tất cả những gì con có hôm nay đều nhờ bố. Cảm ơn bố vì đã nuôi con khôn lớn, dạy con làm người, và luôn tin tưởng con. Bố là người hùng của con!<br><br>
        Yêu bố!\"
        </p>
        
        <h3>Cảm ơn anh trai:</h3>
        <p style="font-style: italic; padding: 15px; background: #f8f8f8; border-left: 3px solid #d4af37;">
        \"Anh trai,<br><br>
        Cảm ơン anh vì đã luôn bảo vệ em, giúp đỡ em, và là người em có thể tin tưởng. Dù anh hay trêu chọc em, nhưng em biết anh yêu em. Em cũng yêu anh!<br><br>
        Thanks bro!\"
        </p>
        
        <h2>Món quà cảm ơn từ DearHim</h2>
        <p>Hộp quà \"Thank You\" từ DearHim với:</p>
        <ul>
          <li>Thiệp cảm ơn viết tay chạm tim</li>
          <li>Quà anh ấy thích</li>
          <li>Ảnh kỷ niệm đẹp</li>
          <li>Đóng gói sang trọng</li>
        </ul>
        
        <p><strong>Đừng ngại nói cảm ơn - Đó là món quà tinh thần tuyệt vời nhất!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80',
      category: 'Tình cảm',
      tags: ['Cảm ơn', 'Tình cảm', 'Ghi nhận'],
      readTime: 7
    }
  ];

  await Blog.insertMany(blogs);
  console.log('Seeded 7 gift-themed blog posts for DearHim!');
  process.exit();
}

seedBlogs();
