import React, { useEffect, useState } from "react";
import api from "../api";
import { useOutletContext, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

/**
 * Home page hoàn chỉnh:
 * - Hero (SEO tags)
 * - Câu chuyện bã cà phê
 * - Montessori
 * - Product grid (từ api.get('/products'))
 * - Chatbot mini (mô phỏng, dễ nối API)
 * - JSON-LD (Organization + WebPage + Product list sơ bộ)
 */

export default function Home() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { addToCart } = useOutletContext();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! Mình là DearHim Bot 💎 — Mình có thể giúp bạn chọn hộp quà phù hợp cho người đặc biệt của bạn!",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((r) => setProducts(r.data || []))
      .catch(() => {
        setProducts([]);
      });

    // Fetch blogs
    api
      .get("/blogs")
      .then((r) => setBlogs(r.data || []))
      .catch(() => {
        setBlogs([]);
      });
  }, []);

  // Chatbot logic với câu trả lời thông minh
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Chào hỏi
    if (input.includes('xin chào') || input.includes('chào') || input.includes('hello') || input.includes('hi')) {
      return "Xin chào! Mình là DearHim Bot 💎 Mình có thể giúp bạn chọn hộp quà phù hợp. Bạn muốn tặng quà cho ai?";
    }

    // Hỏi về dịp
    if (input.includes('sinh nhật') || input.includes('birthday')) {
      return "Hộp quà sinh nhật của DearHim rất đặc biệt! Bao gồm quà chọn lọc, thiệp viết tay, ảnh in theo yêu cầu. Ngân sách của bạn khoảng bao nhiêu? 🎂";
    }

    if (input.includes('kỷ niệm') || input.includes('anniversary')) {
      return "Hộp quà kỷ niệm là món quà ý nghĩa nhất! Được cá nhân hóa hoàn toàn với ảnh, thiệp tay và sản phẩm cao cấp. Bạn muốn xem mẫu không? 💕";
    }

    if (input.includes('cảm ơn') || input.includes('thank')) {
      return "Hộp quà cảm ơn thể hiện sự trân trọng! Đơn giản nhưng tinh tế, phù hợp để gửi lời cảm ơn chân thành. Bạn muốn tìm hiểu thêm không? 🙏";
    }

    // Hỏi về người nhận
    if (input.includes('người yêu') || input.includes('bạn trai') || input.includes('boyfriend')) {
      return "Hộp quà cho người yêu của DearHim rất lãng mạn! Kết hợp quà tặng ý nghĩa với thiệp viết tay và ảnh kỷ niệm. Dịp đặc biệt nào vậy bạn? ❤️";
    }

    if (input.includes('bố') || input.includes('cha') || input.includes('dad')) {
      return "Hộp quà cho bố luôn chứa đựng nhiều cảm xúc! Sản phẩm chất lượng, thiệp tay chân thành. Bố bạn thích gì nhất? 👨";
    }

    if (input.includes('bạn bè') || input.includes('friend')) {
      return "Hộp quà cho bạn bè vui tươi và ý nghĩa! Giá phải chăng cho Gen Z, vẫn đảm bảo chất lượng cao. Bạn muốn xem các mẫu không? 🤝";
    }

    // Hỏi về giá
    if (input.includes('giá') || input.includes('bao nhiêu') || input.includes('tiền') || input.includes('ngân sách')) {
      return "Hộp quà DearHim có giá từ 300,000₫ đến 1,000,000₫ tùy mức độ cá nhân hóa. Phù hợp ngân sách Gen Z nhưng vẫn cao cấp! Bạn muốn xem chi tiết không? 💰";
    }

    // Hỏi về nội dung hộp
    if (input.includes('có gì') || input.includes('trong hộp') || input.includes('sản phẩm') || input.includes('gồm')) {
      return "Mỗi hộp DearHim gồm: 🎁 Sản phẩm được lựa chọn cẩn thận, ✍️ Thiệp viết tay theo yêu cầu, 📸 Ảnh in đẹp, 🏷️ Logo và sticker thương hiệu. Tất cả được đóng gói tinh tế! ";
    }

    // Hỏi về tùy chỉnh
    if (input.includes('tùy chỉnh') || input.includes('cá nhân') || input.includes('personalize')) {
      return "DearHim chuyên về cá nhân hóa! Bạn có thể viết nội dung thiệp, chọn ảnh in, và lựa chọn sản phẩm. Mỗi hộp là duy nhất! ✨";
    }

    // Hỏi về giao hàng
    if (input.includes('giao hàng') || input.includes('ship') || input.includes('vận chuyển') || input.includes('bao lâu')) {
      return "DearHim giao hàng toàn quốc trong 2-4 ngày. Đóng gói kín đáo, đảm bảo bí mật tuyệt đối! Bạn muốn đặt hàng không? 📦";
    }

    // Tạm biệt
    if (input.includes('tạm biệt') || input.includes('bye')) {
      return "Tạm biệt! Hy vọng bạn tìm được món quà hoàn hảo tại DearHim. Hẹn gặp lại! 👋";
    }

    // Mặc định
    return "Mình có thể giúp bạn về: 🎁 Các loại hộp quà, 💰 Giá cả, ✨ Tùy chỉnh cá nhân, 📦 Giao hàng, 💎 Nội dung hộp quà. Bạn muốn hỏi về điều gì?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const userInput = input.trim();
    setInput("");

    // Hiển thị typing indicator
    setMessages((m) => [...m, { sender: "bot", text: "...", typing: true }]);

    // Phản hồi thông minh sau 800ms
    setTimeout(() => {
      setMessages((m) => {
        const filtered = m.filter(msg => !msg.typing);
        return [...filtered, { sender: "bot", text: getBotResponse(userInput) }];
      });
    }, 800);
  };

  // Tạo JSON-LD cho SEO (Organization + WebPage + Products nếu có)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://your-site.example/#organization",
        "name": "DearHim",
        "url": "https://your-site.example/",
        "logo": "https://your-site.example/logo.png",
        "sameAs": ["https://facebook.com/dearhim", "https://instagram.com/dearhim"]
      },
      {
        "@type": "WebPage",
        "@id": "https://your-site.example/home",
        "url": "https://your-site.example/",
        "name": "DearHim - Hộp quà tinh tế dành cho nam",
        "description":
          "DearHim - Hộp quà cá nhân hóa dành cho nam. Thiệp viết tay, ảnh in, sản phẩm chọn lọc. Tạo trải nghiệm đáng nhớ cho người đặc biệt."
      },
      // Optionally add product schema for visible products (limit 5)
      ...products.slice(0, 5).map((p) => ({
        "@type": "Product",
        "@id": `https://your-site.example/product/${p._id}`,
        "name": p.name,
        "image": p.img || "https://your-site.example/default-product.png",
        "description": p.desc || "",
        "sku": p._id,
        "offers": {
          "@type": "Offer",
          "url": `https://your-site.example/product/${p._id}`,
          "priceCurrency": "VND",
          "price": p.price || "0",
          "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }))
    ]
  };

  return (
    <>
      <Helmet>
        <title>DearHim — Hộp quà tinh tế dành cho nam | Gift Box for Men</title>
        <meta name="description" content="DearHim - Hộp quà cá nhân hóa dành cho nam. Thiệp viết tay, ảnh in, sản phẩm chọn lọc. Phù hợp ngân sách Gen Z, trải nghiệm cao cấp." />
        <link rel="canonical" href="https://your-site.example/" />
        {/* Open Graph */}
        <meta property="og:title" content="DearHim — Hộp quà tinh tế dành cho nam" />
        <meta property="og:description" content="Hộp quà DearHim giúp bạn dễ dàng tặng quà ý nghĩa. Cá nhân hóa hoàn toàn, tạo kỷ niệm đáng nhớ." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://your-site.example/og-image.png" />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Floating Background Orbs */}
        <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center py-24 px-6 min-h-[85vh] flex flex-col items-center justify-center"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="inline-block px-6 py-3 bg-white/80 backdrop-blur-md border-2 border-yellow-200 rounded-full mb-8 shadow-lg"
          >
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent text-sm font-bold tracking-wide">QUÀ TẶNG Ý NGHĨA CHO NAM GIỚI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">DearHim</span>

            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tặng quà cho "anh ấy" thật dễ dàng
            </div>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Đừng lo không biết tặng gì! Mỗi hộp quà được <span className="font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">thiết kế riêng cho anh ấy</span>. Có thiệp tay, ảnh in đẹp, và những món quà anh ấy thích — Tạo nên kỷ niệm đáng nhớ cho cả hai.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white font-bold text-xl rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span className="relative z-10 drop-shadow-md">Tìm món quà ngay!</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white/90 backdrop-blur-md border-3 border-purple-300 text-purple-700 font-bold text-xl rounded-full hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Tìm hiểu thêm
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>

        {/* STORY (DearHim brand) */}
        <section className="bg-[#f8fafc] py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-bold text-[#1e3a5f] mb-4"
              >
                Câu chuyện thương hiệu
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#2c5f8d] leading-relaxed mb-4"
              >
                DEARHIM sinh ra từ một ý tưởng đơn giản nhưng sâu sắc: mỗi người nam đều xứng đáng được trân trọng, dù họ ít khi nhận quà. Chúng tôi nhận thấy nhiều bạn trẻ gặp khó khăn khi chọn quà: lo món quà không đủ ý nghĩa, không phù hợp, hay quá cầu kỳ.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#2c5f8d] leading-relaxed"
              >
                Chính vì thế, DEARHIM không chỉ là một hộp quà, đó là một trải nghiệm được thiết kế rieng cho từng người nhận. Mỗi hộp là sự kết hợp tinh tế giữa sản phẩm được lựa chọn cẩn thận, thiệp viết tay, ảnh in theo yêu cầu, logo và sticker thương hiệu.
              </motion.p>

              <motion.ul
                className="mt-4 text-sm text-[#2c5f8d] space-y-2"
              >
                {[
                  "Hộp quà được thiết kế cá nhân hóa cho từng người nhận",
                  "Kết hợp sản phẩm chọn lọc, thiệp tay, ảnh in theo yêu cầu",
                  "Phù hợp ngân sách Gen Z, trải nghiệm cao cấp và tinh tế"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  >
                    • {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80"
                alt="Hộp quà DearHim"
                loading="lazy"
                className="w-full h-64 object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* VALUE PROPOSITIONS */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-[#1e3a5f] mb-4"
            >
              Vì sao chọn DearHim?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#2c5f8d] max-w-3xl mx-auto"
            >
              DearHim giúp việc tặng quà trở nên đơn giản nhưng tinh tế, tạo nên trải nghiệm đáng nhớ.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Dễ dàng", desc: "Không còn lo chọn quà không phù hợp hay không đủ ý nghĩa" },
                { title: "Ý nghĩa", desc: "Mỗi hộp là một trải nghiệm cảm xúc, tạo kỷ niệm đáng nhớ" },
                { title: "Tinh tế", desc: "Thiết kế cao cấp, đóng gói chuyên nghiệp, phù hợp Gen Z" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.15 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    y: -5
                  }}
                  className="bg-white rounded-2xl p-4 shadow cursor-pointer"
                >
                  <h3 className="font-semibold text-[#1e3a5f]">{item.title}</h3>
                  <p className="text-sm text-[#2c5f8d] mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="p-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1e3a5f]"
            >
              Hộp quà nổi bật
            </motion.h2>
            <Link
              to="/products"
              className="text-sm text-[#2c5f8d] hover:text-[#1e3a5f] font-medium underline transition"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              // fallback UI khi chưa có product
              <div className="col-span-full text-center text-gray-500 py-10">Không có sản phẩm. Hãy thử seed data hoặc kiểm tra API.</div>
            ) : (
              products.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(30, 58, 95, 0.25)" }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col group transition-all duration-300 border border-slate-100"
                >
                  <Link to={`/product/${p._id}`} className="block relative overflow-hidden">
                    <img
                      src={p.img || "https://via.placeholder.com/600x360"}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link to={`/product/${p._id}`} className="font-semibold text-lg text-[#1e3a5f] hover:text-[#2c5f8d]">
                      {p.name}
                    </Link>

                    <div className="text-[#d4af37] font-bold mt-2">{(p.price || 0).toLocaleString("vi-VN")}₫</div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{p.desc}</p>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <motion.button
                        whileHover={{ scale: 1.08, boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart({ id: p._id, name: p.name, price: p.price, img: p.img })}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        aria-label={`Thêm ${p.name} vào giỏ`}
                      >
                        Thêm vào giỏ
                      </motion.button>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to={`/product/${p._id}`} className="text-sm text-[#1e3a5f] font-semibold hover:text-[#2c5f8d] transition-colors">Xem chi tiết →</Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section className="py-10 px-6 bg-[#FFF8F0]">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-[#704214]"
            >
              Bài viết nổi bật
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm text-[#5a4633] mt-2 mb-4"
            >
              Tư vấn Montessori, mẹo chọn đồ chơi, cách tái chế bã cà phê.
            </motion.p>
            <Link
              to="/blog"
              className="inline-block text-sm text-[#a64b4b] hover:text-[#704214] font-medium underline transition mb-6"
            >
              Xem tất cả bài viết →
            </Link>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {blogs.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-10">
                  Chưa có bài viết. Hãy chạy seed data!
                </div>
              ) : (
                blogs.slice(0, 3).map((blog, idx) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
                      y: -5
                    }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="relative h-48 bg-gradient-to-br from-[#FFE5B4] to-[#FFF5B1] overflow-hidden">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">📝</div>';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">
                            📝
                          </div>
                        )}
                        {blog.category && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-[#704214] rounded-full text-xs font-semibold shadow-sm">
                            {blog.category}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <h4 className="font-bold text-lg text-[#704214] mb-2 line-clamp-2 hover:text-[#8B5A2B] transition">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>📖 {blog.readTime} phút đọc</span>
                      </div>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-sm text-[#a64b4b] hover:text-[#704214] underline font-medium transition"
                      >
                        Đọc thêm →
                      </Link>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-8 px-6 mt-8 bg-[#f8fafc]"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="font-bold text-[#1e3a5f]">DearHim</div>
              <div className="text-sm text-[#2c5f8d] mt-2">Hộp quà tinh tế dành cho nam — Biến món quà thành kỷ niệm đáng nhớ.</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-[#2c5f8d]"
            >
              <div>📞 Hotline: 0123-456-789</div>
              <div>📧 Email: hello@dearhim.vn</div>
              <div className="mt-2">© {new Date().getFullYear()} DearHim. All rights reserved.</div>
            </motion.div>
          </div>
        </motion.footer>

        {/* CHATBOT FLOAT */}
        <div className="fixed bottom-6 right-6 z-50">
          <AnimatePresence>
            {!isChatOpen && (
              <motion.button
                key="chat-btn"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setIsChatOpen(true)}
                className="bg-[#1e3a5f] text-white p-4 rounded-full shadow-lg hover:bg-[#2c5f8d] transition text-2xl"
                aria-label="Mở chat hỗ trợ"
              >
                💬
              </motion.button>
            )}

            {isChatOpen && (
              <motion.div
                key="chatbox"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl w-80 h-96 shadow-xl border border-[#d4af37] flex flex-col"
                role="dialog"
                aria-label="DearHim chat"
              >
                <div className="bg-[#1e3a5f] text-white px-4 py-2 rounded-t-3xl flex justify-between items-center font-semibold">
                  DearHim Bot 💎
                  <button onClick={() => setIsChatOpen(false)} aria-label="Đóng chat">✖</button>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-2">
                  {messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: m.sender === "bot" ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`p-2 rounded-xl max-w-[80%] text-sm ${m.sender === "bot" ? "bg-slate-100 text-[#1e3a5f] self-start" : "bg-[#1e3a5f] text-white self-end ml-auto"}`}
                    >
                      {m.text}
                    </motion.div>
                  ))}

                  {/* Quick reply buttons */}
                  {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['Sinh nhật', 'Kỷ niệm', 'Cảm ơn', 'Bạn bè'].map((occasion) => (
                        <button
                          key={occasion}
                          onClick={() => {
                            setInput(occasion);
                            setTimeout(() => handleSend(), 100);
                          }}
                          className="px-3 py-1 bg-white border border-[#d4af37] text-[#1e3a5f] rounded-full text-xs hover:bg-[#d4af37] hover:text-white transition"
                        >
                          {occasion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-2 border-t">
                  {/* Suggested questions */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {['Giá bao nhiêu?', 'Có gì trong hộp?', 'Giao hàng bao lâu?'].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none"
                      aria-label="Nhập tin nhắn"
                    />
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleSend} className="bg-[#d4af37] text-white px-3 py-1 rounded-full hover:bg-[#c19b2f] transition">
                      ➤
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
