import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Giới thiệu - DearHim | Hộp quà dành cho nam</title>
        <meta
          name="description"
          content="DearHim - Thương hiệu hộp quà cá nhân hóa dành cho nam. Thiệp viết tay, ảnh in, sản phẩm chọn lọc - Tạo trải nghiệm đáng nhớ."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Floating Background Orbs */}
        <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center py-20 px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl">🎁</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6"
          >
            Về DearHim
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Biến mỗi món quà thành kỷ niệm đáng nhớ
          </motion.p>
        </motion.section>

        {/* Mission Section */}
        <section className="py-16 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                DearHim ra đời với sứ mệnh giúp bạn dễ dàng tặng quà ý nghĩa cho những người nam đặc biệt.
                Mỗi hộp quà là một trải nghiệm được cá nhân hóa, tạo nên những kỷ niệm đáng nhớ và cảm xúc chân thành.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📦",
                  title: "Cá nhân hóa",
                  desc: "Mỗi hộp quà được thiết kế riêng biệt với thiệp tay, ảnh in và sản phẩm chọn lọc.",
                  gradient: "from-blue-400 to-indigo-500"
                },
                {
                  icon: "💎",
                  title: "Tinh tế",
                  desc: "Thiết kế cao cấp, đóng gói chuyên nghiệp, tạo trải nghiệm mở hộp đáng nhớ.",
                  gradient: "from-purple-400 to-pink-500"
                },
                {
                  icon: "❤️",
                  title: "Ý nghĩa",
                  desc: "Không chỉ là vật chất, mỗi hộp quà truyền tải cảm xúc và sự trân trọng.",
                  gradient: "from-pink-400 to-rose-500"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center relative overflow-hidden border border-white/60"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`}></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                  Câu chuyện của chúng tôi
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                  <p>
                    <strong className="text-purple-600">DearHim</strong> sinh ra từ một ý tưởng đơn giản nhưng sâu sắc:
                    mỗi người nam đều xứng đáng được trân trọng, dù họ ít khi nhận quà.
                  </p>
                  <p>
                    Chúng tôi nhận thấy nhiều bạn trẻ gặp khó khăn khi chọn quà: lo món quà không đủ ý nghĩa,
                    không phù hợp, hay quá cầu kỳ.
                  </p>
                  <p>
                    Chính vì thế, <strong className="text-indigo-600">DearHim</strong> không chỉ là một hộp quà -
                    đó là một trải nghiệm được thiết kế riêng cho từng người nhận. Mỗi hộp là sự kết hợp tinh tế
                    giữa sản phẩm được lựa chọn cẩn thận, thiệp viết tay, ảnh in theo yêu cầu, logo và sticker thương hiệu.
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                    <p className="font-bold text-purple-700 text-xl">
                      DearHim giúp việc tặng quà trở nên đơn giản nhưng tinh tế, phù hợp ngân sách Gen Z,
                      tạo nên dấu ấn riêng biệt!
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80"
                    alt="Hộp quà DearHim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-3xl blur-2xl opacity-20 -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section - REDESIGNED */}
        <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Quy trình tạo hộp quà
              </h2>
              <p className="text-xl text-gray-700">
                Từ ý tưởng đến hộp quà hoàn hảo — Mỗi bước đều được chăm chút tỉ mỉ
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: '🛒', title: 'Chọn', desc: 'Chọn chủ đề hộp quà phù hợp với tính cách', gradient: 'from-blue-400 to-indigo-500', bg: 'from-blue-50 to-indigo-50' },
                { icon: '✏️', title: 'Tùy chỉnh', desc: 'Thiệp viết tay, ảnh in theo yêu cầu cá nhân', gradient: 'from-purple-400 to-pink-500', bg: 'from-purple-50 to-pink-50' },
                { icon: '📦', title: 'Đóng gói', desc: 'Đóng gói tinh tế với logo và sticker thương hiệu', gradient: 'from-pink-400 to-rose-500', bg: 'from-pink-50 to-rose-50' },
                { icon: '🚚', title: 'Giao hàng', desc: 'Giao tận nơi, bảo mật và nhanh chóng', gradient: 'from-orange-400 to-red-500', bg: 'from-orange-50 to-red-50' },
                { icon: '🎉', title: 'Trải nghiệm', desc: 'Người nhận mở hộp và tận hưởng niềm vui', gradient: 'from-yellow-400 to-orange-500', bg: 'from-yellow-50 to-orange-50' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl text-center relative overflow-hidden transition-all duration-300"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-50`}></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300`}>
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shadow">
                    {idx + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto text-center bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-12 md:p-16 border border-white/60 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6">
              Tạo hộp quà của bạn ngay!
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Mỗi món quà DearHim bạn chọn là một trải nghiệm đáng nhớ.
              Hãy cùng chúng tôi tạo nên những kỷ niệm đẹp với người đặc biệt của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/products"
                className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white rounded-full font-bold text-lg hover:shadow-2xl transition hover:scale-105"
              >
                Khám phá sản phẩm
              </Link>
              <Link
                to="/create-wish"
                className="px-10 py-5 bg-white border-3 border-purple-500 text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition hover:scale-105 shadow-lg"
              >
                Tạo lời chúc QR
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Liên hệ với chúng tôi
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  <strong className="text-purple-600">Hotline:</strong> 0123-456-789
                </p>
                <p>
                  <strong className="text-purple-600">Email:</strong> hello@dearhim.vn
                </p>
                <p>
                  <strong className="text-purple-600">Địa chỉ:</strong> 123 Đường Tặng Quà, Quận 1, TP. HCM
                </p>
              </div>
              <div className="mt-10">
                <Link
                  to="/"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full hover:shadow-xl transition hover:scale-105"
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
