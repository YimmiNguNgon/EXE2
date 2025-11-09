import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Giới thiệu - Grella | Đồ chơi Montessori từ bã cà phê</title>
        <meta
          name="description"
          content="Grella - Thương hiệu đồ chơi Montessori từ bã cà phê tái chế. An toàn cho trẻ, thân thiện môi trường, phát triển tư duy sáng tạo."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA]">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 px-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl font-extrabold text-[#704214] mb-6"
          >
            🌱 Về Grella
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-[#5a4633] max-w-3xl mx-auto leading-relaxed"
          >
            Chúng tôi biến bã cà phê thành đồ chơi giáo dục — An toàn cho trẻ, thân thiện với môi trường
          </motion.p>
        </motion.section>

        {/* Mission Section */}
        <section className="py-12 px-6 bg-white/80">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#704214] mb-4">
                🎯 Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-[#5a4633] max-w-3xl mx-auto">
                Grella ra đời với sứ mệnh tạo ra những món đồ chơi giáo dục chất lượng cao từ vật liệu tái chế,
                giúp trẻ phát triển toàn diện theo phương pháp Montessori, đồng thời bảo vệ môi trường cho thế hệ tương lai.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌍",
                  title: "Bảo vệ môi trường",
                  desc: "Tái chế hàng tấn bã cà phê mỗi năm, giảm thiểu rác thải và ô nhiễm môi trường."
                },
                {
                  icon: "👶",
                  title: "An toàn cho trẻ",
                  desc: "100% vật liệu sinh học, không chứa hóa chất độc hại, được kiểm định nghiêm ngặt."
                },
                {
                  icon: "🎓",
                  title: "Phát triển tư duy",
                  desc: "Thiết kế theo phương pháp Montessori, kích thích sự sáng tạo và tư duy logic."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#704214] mb-3">{item.title}</h3>
                  <p className="text-[#5a4633]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-[#704214] mb-6">
                ☕ Câu chuyện của chúng tôi
              </h2>
              <div className="space-y-4 text-[#5a4633] leading-relaxed">
                <p>
                  Grella được thành lập vào năm 2024 bởi một nhóm các bậc phụ huynh và nhà giáo dục
                  quan tâm đến môi trường. Chúng tôi nhận ra rằng mỗi năm có hàng triệu tấn bã cà phê
                  bị vứt bỏ, gây ô nhiễm môi trường nghiêm trọng.
                </p>
                <p>
                  Đồng thời, chúng tôi cũng lo lắng về chất lượng đồ chơi trẻ em trên thị trường —
                  nhiều sản phẩm chứa hóa chất độc hại, làm từ nhựa không thể phân hủy, và không
                  mang lại giá trị giáo dục thực sự.
                </p>
                <p>
                  Từ đó, ý tưởng về Grella ra đời: Tại sao không biến "rác thải" thành tài nguyên?
                  Tại sao không tạo ra những món đồ chơi vừa an toàn, vừa giáo dục, vừa thân thiện
                  với môi trường?
                </p>
                <p className="font-semibold text-[#704214]">
                  Và thế là Grella — đồ chơi Montessori từ bã cà phê — ra đời!
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
                alt="Bã cà phê tái chế"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 px-6 bg-[#FFF9E6]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#704214] mb-4">
                🔄 Quy trình sản xuất
              </h2>
              <p className="text-lg text-[#5a4633]">
                Từ bã cà phê đến đồ chơi giáo dục — Mỗi bước đều được kiểm soát chặt chẽ
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Thu gom", desc: "Thu gom bã cà phê từ các quán cà phê địa phương" },
                { step: "2", title: "Xử lý", desc: "Làm sạch, khử mùi và sấy khô hoàn toàn" },
                { step: "3", title: "Gia công", desc: "Kết hợp với keo sinh học an toàn, không độc hại" },
                { step: "4", title: "Tạo hình", desc: "Đúc khuôn thành các chi tiết đồ chơi theo thiết kế" },
                { step: "5", title: "Kiểm định", desc: "Kiểm tra chất lượng và đóng gói thân thiện môi trường" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-md text-center relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#A8E6CF] text-[#225544] rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-[#704214] mt-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5a4633]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#704214] mb-4">
                💎 Giá trị cốt lõi
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Bền vững",
                  icon: "♻️",
                  desc: "Chúng tôi cam kết sử dụng 100% vật liệu tái chế và quy trình sản xuất thân thiện môi trường. Mỗi sản phẩm Grella góp phần giảm thiểu rác thải và bảo vệ hành tinh xanh."
                },
                {
                  title: "An toàn",
                  icon: "🛡️",
                  desc: "An toàn của trẻ là ưu tiên hàng đầu. Tất cả sản phẩm đều được làm từ vật liệu sinh học, không chứa BPA, phthalates hay bất kỳ hóa chất độc hại nào. Được kiểm định theo tiêu chuẩn quốc tế."
                },
                {
                  title: "Giáo dục",
                  icon: "📚",
                  desc: "Thiết kế theo phương pháp Montessori, mỗi món đồ chơi Grella đều có mục đích giáo dục rõ ràng. Giúp trẻ phát triển vận động tinh, tư duy logic, khả năng giải quyết vấn đề và sự sáng tạo."
                },
                {
                  title: "Chất lượng",
                  icon: "⭐",
                  desc: "Chúng tôi không chỉ tạo ra đồ chơi, mà tạo ra những sản phẩm bền vững có thể sử dụng lâu dài, thậm chí truyền lại cho thế hệ sau. Mỗi chi tiết đều được chăm chút tỉ mỉ."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{item.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#704214] mb-3">{item.title}</h3>
                      <p className="text-[#5a4633] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Montessori Section */}
        <section className="py-12 px-6 bg-[#E8FBEA]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#2E7D32] mb-4">
                🎓 Phương pháp Montessori
              </h2>
              <p className="text-lg text-[#2E4D25] max-w-3xl mx-auto">
                Grella áp dụng triết lý Montessori vào từng sản phẩm
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h3 className="text-2xl font-bold text-[#2E7D32] mb-4">
                  Nguyên tắc Montessori
                </h3>
                <ul className="space-y-3 text-[#2E4D25]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Tự lập:</strong> Trẻ được khuyến khích tự làm và khám phá</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Học qua làm:</strong> Trải nghiệm thực tế thay vì lý thuyết</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Tôn trọng:</strong> Tôn trọng tốc độ phát triển riêng của mỗi bé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Môi trường chuẩn bị:</strong> Không gian học tập phù hợp</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h3 className="text-2xl font-bold text-[#2E7D32] mb-4">
                  Lợi ích cho trẻ
                </h3>
                <ul className="space-y-3 text-[#2E4D25]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">★</span>
                    <span>Phát triển vận động tinh và thô</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">★</span>
                    <span>Kích thích tư duy logic và giải quyết vấn đề</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">★</span>
                    <span>Tăng khả năng tập trung và kiên nhẫn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#2E7D32] font-bold">★</span>
                    <span>Nuôi dưỡng sự tự tin và độc lập</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center bg-white rounded-3xl shadow-xl p-12"
          >
            <h2 className="text-4xl font-bold text-[#704214] mb-6">
              Cùng Grella bảo vệ môi trường! 🌍
            </h2>
            <p className="text-lg text-[#5a4633] mb-8 leading-relaxed">
              Mỗi món đồ chơi Grella bạn chọn là một bước nhỏ hướng tới tương lai xanh hơn.
              Hãy cùng chúng tôi tạo ra thế hệ trẻ em yêu thiên nhiên, sáng tạo và có trách nhiệm với môi trường.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-4 bg-[#A8E6CF] text-[#225544] rounded-full font-bold text-lg hover:bg-[#8FD9B6] transition shadow-lg"
              >
                🛒 Khám phá sản phẩm
              </Link>
              <Link
                to="/blog"
                className="px-8 py-4 bg-[#704214] text-white rounded-full font-bold text-lg hover:bg-[#8B5A2B] transition shadow-lg"
              >
                📚 Đọc blog
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-12 px-6 bg-[#F9F7F5]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-[#704214] mb-6">
                📞 Liên hệ với chúng tôi
              </h2>
              <div className="space-y-3 text-[#5a4633]">
                <p className="text-lg">
                  <strong>Hotline:</strong> 0123-456-789
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> hello@grella.example
                </p>
                <p className="text-lg">
                  <strong>Địa chỉ:</strong> 123 Đường Tái Chế, Quận Xanh, TP. HCM
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-block px-6 py-3 text-[#704214] hover:text-[#8B5A2B] font-medium transition"
                >
                  ← Về trang chủ
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
