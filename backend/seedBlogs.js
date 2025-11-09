const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

async function seedBlogs(){
  await mongoose.connect(process.env.MONGO_URI);
  await Blog.deleteMany({});
  
  const blogs = [
    {
      title: 'Giới thiệu về Grella - Đồ chơi từ bã cà phê',
      slug: 'gioi-thieu-ve-grella',
      excerpt: 'Khám phá câu chuyện đằng sau Grella và sứ mệnh tạo ra đồ chơi thân thiện môi trường.',
      content: `
        <h2>Grella là gì?</h2>
        <p>Grella là thương hiệu đồ chơi Montessori được làm từ bã cà phê tái chế. Chúng tôi tin rằng đồ chơi không chỉ để giải trí, mà còn là công cụ giáo dục quan trọng giúp trẻ phát triển toàn diện.</p>
        
        <h2>Tại sao chọn bã cà phê?</h2>
        <p>Mỗi năm, hàng triệu tấn bã cà phê bị vứt bỏ, gây ô nhiễm môi trường nghiêm trọng. Grella biến "rác thải" này thành tài nguyên quý giá, tạo ra đồ chơi an toàn và bền vững.</p>
        
        <h2>Quy trình sản xuất</h2>
        <ol>
          <li><strong>Thu gom:</strong> Bã cà phê được thu gom từ các quán cà phê địa phương</li>
          <li><strong>Xử lý:</strong> Làm sạch, khử mùi và sấy khô hoàn toàn</li>
          <li><strong>Gia công:</strong> Kết hợp với keo sinh học an toàn, không độc hại</li>
          <li><strong>Tạo hình:</strong> Đúc khuôn thành các chi tiết đồ chơi</li>
          <li><strong>Kiểm định:</strong> Kiểm tra chất lượng nghiêm ngặt</li>
        </ol>
        
        <h2>Cam kết của Grella</h2>
        <ul>
          <li>100% vật liệu tái chế và sinh học</li>
          <li>Không chứa BPA, phthalates hay hóa chất độc hại</li>
          <li>Thiết kế theo phương pháp Montessori</li>
          <li>Đóng gói thân thiện môi trường</li>
        </ul>
        
        <h2>Sứ mệnh của chúng tôi</h2>
        <p>Grella không chỉ tạo ra đồ chơi, mà còn góp phần xây dựng tương lai xanh hơn cho thế hệ trẻ. Mỗi sản phẩm Grella là một bước nhỏ hướng tới hành tinh bền vững.</p>
        
        <p><strong>Cùng Grella bảo vệ môi trường và nuôi dưỡng thế hệ tương lai!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      category: 'Giới thiệu',
      tags: ['Grella', 'Giới thiệu', 'Môi trường', 'Tái chế'],
      readTime: 5
    },
    {
      title: 'Montessori: Hướng dẫn cho phụ huynh',
      slug: 'montessori-huong-dan-cho-phu-huynh',
      excerpt: 'Tự học qua cảm quan: cách chọn đồ chơi phù hợp cho bé.',
      content: `
        <h2>Phương pháp Montessori là gì?</h2>
        <p>Montessori là phương pháp giáo dục tập trung vào việc phát triển tự nhiên của trẻ thông qua trải nghiệm thực tế. Phương pháp này được phát triển bởi bác sĩ Maria Montessori vào đầu thế kỷ 20.</p>
        
        <h2>Nguyên tắc cơ bản</h2>
        <ul>
          <li><strong>Tự lập:</strong> Trẻ được khuyến khích tự làm và khám phá</li>
          <li><strong>Môi trường chuẩn bị:</strong> Không gian học tập được thiết kế phù hợp với trẻ</li>
          <li><strong>Tôn trọng:</strong> Tôn trọng tốc độ phát triển riêng của mỗi bé</li>
          <li><strong>Thực hành:</strong> Học qua làm và trải nghiệm thực tế</li>
        </ul>
        
        <h2>Cách chọn đồ chơi Montessori</h2>
        <p>Khi chọn đồ chơi Montessori cho bé, hãy chú ý:</p>
        <ol>
          <li>Chất liệu tự nhiên, an toàn</li>
          <li>Thiết kế đơn giản, không quá phức tạp</li>
          <li>Kích thích giác quan và tư duy</li>
          <li>Phù hợp với độ tuổi và khả năng của bé</li>
        </ol>
        
        <h2>Đồ chơi Grella - Lựa chọn hoàn hảo</h2>
        <p>Grella tạo ra đồ chơi từ bã cà phê tái chế, kết hợp hoàn hảo giữa thân thiện môi trường và phương pháp Montessori. Mỗi sản phẩm được thiết kế để phát triển kỹ năng cụ thể cho bé.</p>
      `,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
      category: 'Giáo dục',
      tags: ['Montessori', 'Phụ huynh', 'Giáo dục'],
      readTime: 5
    },
    {
      title: 'Tại sao chọn đồ chơi từ bã cà phê?',
      slug: 'tai-sao-chon-do-choi-tu-ba-ca-phe',
      excerpt: 'Lợi ích môi trường và giáo dục khi tái chế bã cà phê.',
      content: `
        <h2>Vấn đề rác thải bã cà phê</h2>
        <p>Mỗi năm, hàng triệu tấn bã cà phê bị vứt bỏ, gây ô nhiễm môi trường. Grella biến "rác thải" này thành tài nguyên quý giá.</p>
        
        <h2>Quy trình tái chế của Grella</h2>
        <ol>
          <li><strong>Thu gom:</strong> Bã cà phê được thu gom từ các quán cà phê địa phương</li>
          <li><strong>Xử lý:</strong> Làm sạch, khử mùi và sấy khô hoàn toàn</li>
          <li><strong>Gia công:</strong> Kết hợp với keo sinh học an toàn</li>
          <li><strong>Tạo hình:</strong> Đúc khuôn thành các chi tiết đồ chơi</li>
          <li><strong>Hoàn thiện:</strong> Kiểm tra chất lượng và đóng gói thân thiện môi trường</li>
        </ol>
        
        <h2>Lợi ích cho bé</h2>
        <ul>
          <li>An toàn tuyệt đối, không chứa hóa chất độc hại</li>
          <li>Kết cấu tự nhiên, kích thích xúc giác</li>
          <li>Bền vững và thân thiện môi trường</li>
          <li>Dạy bé về tái chế và bảo vệ môi trường</li>
        </ul>
        
        <h2>Cam kết của Grella</h2>
        <p>Chúng tôi cam kết 100% sản phẩm được làm từ vật liệu tái chế, an toàn cho trẻ và thân thiện với môi trường. Mỗi món đồ chơi Grella là một bước nhỏ hướng tới tương lai xanh hơn.</p>
      `,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      category: 'Môi trường',
      tags: ['Tái chế', 'Bã cà phê', 'Môi trường'],
      readTime: 6
    },
    {
      title: 'Hướng dẫn vệ sinh đồ chơi',
      slug: 'huong-dan-ve-sinh-do-choi',
      excerpt: 'Cách bảo quản đồ chơi Grella để bền lâu.',
      content: `
        <h2>Tại sao cần vệ sinh đồ chơi?</h2>
        <p>Đồ chơi là vật dụng bé tiếp xúc hàng ngày. Vệ sinh đúng cách giúp bảo vệ sức khỏe bé và kéo dài tuổi thọ đồ chơi.</p>
        
        <h2>Cách vệ sinh đồ chơi Grella</h2>
        
        <h3>Vệ sinh hàng ngày</h3>
        <ul>
          <li>Dùng khăn mềm, ẩm lau nhẹ bề mặt</li>
          <li>Tránh ngâm nước hoặc rửa trực tiếp</li>
          <li>Để khô tự nhiên ở nơi thoáng mát</li>
        </ul>
        
        <h3>Vệ sinh sâu (1 lần/tuần)</h3>
        <ol>
          <li>Pha dung dịch nước ấm + vài giọt xà phòng nhẹ</li>
          <li>Dùng khăn mềm thấm dung dịch, vắt khô</li>
          <li>Lau nhẹ nhàng từng chi tiết</li>
          <li>Lau lại bằng khăn ẩm sạch</li>
          <li>Lau khô và phơi nơi thoáng mát</li>
        </ol>
        
        <h2>Lưu ý quan trọng</h2>
        <div class="warning">
          <p><strong>KHÔNG nên:</strong></p>
          <ul>
            <li>Ngâm nước hoặc rửa dưới vòi</li>
            <li>Dùng chất tẩy rửa mạnh</li>
            <li>Phơi trực tiếp dưới nắng gắt</li>
            <li>Sử dụng máy rửa bát/máy giặt</li>
          </ul>
        </div>
        
        <h2>Bảo quản đúng cách</h2>
        <ul>
          <li>Cất trong hộp hoặc túi vải khi không dùng</li>
          <li>Tránh nơi ẩm ướt, nhiệt độ cao</li>
          <li>Kiểm tra định kỳ, loại bỏ chi tiết hỏng</li>
        </ul>
        
        <p>Với cách bảo quản đúng, đồ chơi Grella có thể sử dụng lâu dài, thậm chí truyền lại cho em bé khác!</p>
      `,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      category: 'Hướng dẫn',
      tags: ['Vệ sinh', 'Bảo quản', 'Hướng dẫn'],
      readTime: 4
    },
    {
      title: 'Đồ chơi Montessori cho trẻ 0-3 tuổi',
      slug: 'do-choi-montessori-cho-tre-0-3-tuoi',
      excerpt: 'Gợi ý các loại đồ chơi Montessori phù hợp cho giai đoạn phát triển quan trọng nhất.',
      content: `
        <h2>Giai đoạn 0-3 tuổi - Nền tảng phát triển</h2>
        <p>Từ 0-3 tuổi là giai đoạn vàng trong sự phát triển não bộ của trẻ. Đây là lúc bé hấp thụ mọi thứ xung quanh như một "chiếc bọt biển". Việc chọn đúng đồ chơi sẽ giúp kích thích tối đa khả năng học hỏi tự nhiên của bé.</p>
        
        <h2>0-6 tháng: Kích thích giác quan</h2>
        <ul>
          <li><strong>Mobile treo nôi:</strong> Màu sắc tương phản cao, chuyển động nhẹ nhàng</li>
          <li><strong>Gương an toàn:</strong> Giúp bé nhận diện bản thân</li>
          <li><strong>Xúc xắc mềm:</strong> Kích thích xúc giác và thính giác</li>
        </ul>
        
        <h2>6-12 tháng: Khám phá và vận động</h2>
        <ul>
          <li><strong>Khối gỗ lớn:</strong> Dễ cầm nắm, an toàn khi bé đưa vào miệng</li>
          <li><strong>Hộp thả hình:</strong> Phát triển nhận thức không gian</li>
          <li><strong>Bóng mềm:</strong> Khuyến khích bé bò, lăn</li>
        </ul>
        
        <h2>1-2 tuổi: Tự lập và khám phá</h2>
        <ul>
          <li><strong>Tháp xếp chồng:</strong> Phát triển vận động tinh và logic</li>
          <li><strong>Đồ chơi kéo/đẩy:</strong> Hỗ trợ kỹ năng đi lại</li>
          <li><strong>Ghép hình đơn giản:</strong> 3-5 mảnh lớn</li>
        </ul>
        
        <h2>2-3 tuổi: Sáng tạo và tư duy</h2>
        <ul>
          <li><strong>Đồ chơi xếp hình phức tạp:</strong> Khối gỗ nhiều hình dạng</li>
          <li><strong>Bộ đồ chơi vai trò:</strong> Nhà bếp, bác sĩ, thợ xây</li>
          <li><strong>Tranh ghép 10-20 mảnh:</strong> Phát triển kiên nhẫn</li>
        </ul>
        
        <h2>Lưu ý khi chọn đồ chơi</h2>
        <ul>
          <li>✓ Chọn vật liệu tự nhiên, an toàn (gỗ, vải, bã cà phê)</li>
          <li>✓ Tránh đồ chơi quá phức tạp, nhiều âm thanh chói tai</li>
          <li>✓ Ưu tiên đồ chơi mở (open-ended) - có nhiều cách chơi</li>
          <li>✓ Quan sát sở thích và giai đoạn phát triển của bé</li>
        </ul>
        
        <p>Tất cả sản phẩm Grella đều được thiết kế phù hợp với từng giai đoạn phát triển, làm từ bã cà phê tái chế an toàn tuyệt đối.</p>
      `,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      category: 'Giáo dục',
      tags: ['Montessori', '0-3 tuổi', 'Phát triển'],
      readTime: 7
    },
    {
      title: 'Lợi ích của đồ chơi từ vật liệu tự nhiên',
      slug: 'loi-ich-cua-do-choi-tu-vat-lieu-tu-nhien',
      excerpt: 'Tại sao nên chọn đồ chơi gỗ và vật liệu sinh học thay vì nhựa?',
      content: `
        <h2>Xu hướng quay về tự nhiên</h2>
        <p>Trong thời đại công nghệ và nhựa tràn lan, ngày càng nhiều phụ huynh quan tâm đến việc chọn đồ chơi từ vật liệu tự nhiên cho con. Đây không chỉ là xu hướng mà còn là lựa chọn thông minh cho sức khỏe bé và môi trường.</p>
        
        <h2>Lợi ích cho sức khỏe bé</h2>
        <h3>1. An toàn tuyệt đối</h3>
        <ul>
          <li>Không chứa BPA, phthalates, PVC thường có trong nhựa</li>
          <li>Không gây dị ứng, ít kích ứng da</li>
          <li>An toàn khi bé đưa vào miệng</li>
        </ul>
        
        <h3>2. Kích thích giác quan tốt hơn</h3>
        <ul>
          <li>Kết cấu tự nhiên: Gỗ, bã cà phê có bề mặt ấm áp</li>
          <li>Trọng lượng thực: Giúp bé cảm nhận trọng lực</li>
          <li>Mùi tự nhiên: Không có mùi hóa chất</li>
        </ul>
        
        <h2>Lợi ích cho phát triển trí tuệ</h2>
        <h3>3. Khuyến khích tưởng tượng</h3>
        <p>Đồ chơi tự nhiên thường có thiết kế đơn giản, không có âm thanh hay đèn nhấp nháy. Điều này buộc bé phải sử dụng trí tưởng tượng để tạo ra câu chuyện và cách chơi riêng.</p>
        
        <h3>4. Tập trung tốt hơn</h3>
        <p>Không bị phân tâm bởi âm thanh, đèn LED, bé có thể tập trung sâu hơn vào hoạt động chơi.</p>
        
        <h2>Lợi ích cho môi trường</h2>
        <h3>5. Bền vững và có thể tái chế</h3>
        <ul>
          <li>Phân hủy sinh học: Gỗ, bã cà phê có thể phân hủy tự nhiên</li>
          <li>Giảm rác thải nhựa: Nhựa mất hàng trăm năm mới phân hủy</li>
          <li>Sản xuất thân thiện: Ít tiêu tốn năng lượng</li>
        </ul>
        
        <h3>6. Bền lâu, dùng được nhiều thế hệ</h3>
        <p>Đồ chơi gỗ và vật liệu tự nhiên chất lượng cao có thể sử dụng hàng chục năm, truyền lại cho em bé khác hoặc thế hệ sau.</p>
        
        <h2>Grella - Đồ chơi từ bã cà phê</h2>
        <p>Grella kết hợp ưu điểm của vật liệu tự nhiên với công nghệ tái chế hiện đại. Mỗi sản phẩm không chỉ an toàn cho bé mà còn góp phần giảm rác thải bã cà phê.</p>
        
        <p><strong>Chọn vật liệu tự nhiên = Chọn tương lai xanh cho con!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      category: 'Môi trường',
      tags: ['Vật liệu tự nhiên', 'An toàn', 'Môi trường'],
      readTime: 6
    },
    {
      title: '10 hoạt động Montessori tại nhà',
      slug: '10-hoat-dong-montessori-tai-nha',
      excerpt: 'Các hoạt động đơn giản giúp bé học qua chơi ngay tại nhà.',
      content: `
        <h2>Montessori tại nhà - Dễ hơn bạn nghĩ!</h2>
        <p>Bạn không cần phòng học chuyên dụng hay đồ chơi đắt tiền để áp dụng Montessori. Dưới đây là 10 hoạt động đơn giản bạn có thể làm ngay tại nhà.</p>
        
        <h2>1. Chuyển đậu/hạt bằng thìa</h2>
        <p><strong>Độ tuổi:</strong> 2-4 tuổi</p>
        <p><strong>Chuẩn bị:</strong> 2 bát nhỏ, 1 thìa, đậu/hạt gạo</p>
        <p>Cho bé dùng thìa chuyển đậu từ bát này sang bát kia. Phát triển vận động tinh và sự tập trung.</p>
        
        <h2>2. Rót nước</h2>
        <p><strong>Độ tuổi:</strong> 2.5-5 tuổi</p>
        <p>Cho bé rót nước từ cốc này sang cốc kia. Dạy bé kiểm soát vận động và chịu trách nhiệm.</p>
        
        <h2>3. Ghép màu sắc</h2>
        <p><strong>Độ tuổi:</strong> 1.5-3 tuổi</p>
        <p>Cho bé nhóm các vật dụng cùng màu lại với nhau. Phát triển nhận biết màu sắc và tư duy logic.</p>
        
        <h2>4. Cắt giấy</h2>
        <p><strong>Độ tuổi:</strong> 3-5 tuổi</p>
        <p>Cho bé tập cắt theo đường thẳng, sau đó là đường cong. Chuẩn bị cho việc viết.</p>
        
        <h2>5. Xếp theo kích thước</h2>
        <p><strong>Độ tuổi:</strong> 2-4 tuổi</p>
        <p>Cho bé sắp xếp vật dụng từ nhỏ đến lớn. Phát triển tư duy toán học.</p>
        
        <h2>6. Bóc vỏ trứng luộc</h2>
        <p><strong>Độ tuổi:</strong> 2.5-5 tuổi</p>
        <p>Cho bé tập bóc vỏ trứng. Phát triển kiên nhẫn và kỹ năng sống.</p>
        
        <h2>7. Khay cát viết chữ</h2>
        <p><strong>Độ tuổi:</strong> 3-5 tuổi</p>
        <p>Cho bé dùng ngón tay vẽ hình, viết chữ trên cát. Chuẩn bị cho việc viết.</p>
        
        <h2>8. Gấp khăn/quần áo</h2>
        <p><strong>Độ tuổi:</strong> 3-6 tuổi</p>
        <p>Dạy bé cách gấp khăn, quần áo đơn giản. Phát triển tự lập và trách nhiệm.</p>
        
        <h2>9. Đếm và phân loại</h2>
        <p><strong>Độ tuổi:</strong> 3-5 tuổi</p>
        <p>Cho bé đếm và phân loại vật dụng theo màu, kích thước. Toán học sơ đẳng.</p>
        
        <h2>10. Chăm sóc cây</h2>
        <p><strong>Độ tuổi:</strong> 2-6 tuổi</p>
        <p>Cho bé tưới nước, lau lá cây. Phát triển trách nhiệm và hiểu về thiên nhiên.</p>
        
        <h2>Nguyên tắc khi thực hiện</h2>
        <ul>
          <li>✓ Chuẩn bị môi trường: Mọi thứ ở tầm với của bé</li>
          <li>✓ Thị phạm chậm rãi: Làm mẫu từng bước</li>
          <li>✓ Để bé tự làm: Không can thiệp trừ khi cần</li>
          <li>✓ Chấp nhận sai lầm: Sai lầm là cơ hội học hỏi</li>
          <li>✓ Khen ngợi nỗ lực: Không phải kết quả</li>
        </ul>
        
        <p><strong>Montessori không cần phức tạp - chỉ cần sự kiên nhẫn và tôn trọng bé!</strong></p>
      `,
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      category: 'Giáo dục',
      tags: ['Montessori', 'Hoạt động', 'Tại nhà'],
      readTime: 8
    }
  ];
  
  await Blog.insertMany(blogs);
  console.log('✅ Seeded 7 blog posts successfully!');
  process.exit();
}

seedBlogs();
