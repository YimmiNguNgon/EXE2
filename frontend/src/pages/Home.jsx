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
      text: "Xin chào! Mình là Grella Bot 🌼 — mình có thể giúp bạn chọn đồ chơi phù hợp cho độ tuổi nào?",
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
      return "Xin chào! Mình là Grella Bot 🌼 Mình có thể giúp bạn tìm đồ chơi phù hợp cho bé. Bé nhà bạn bao nhiêu tuổi?";
    }
    
    // Hỏi về độ tuổi
    if (input.match(/\d+/) && (input.includes('tuổi') || input.includes('tháng'))) {
      const age = input.match(/\d+/)[0];
      if (age <= 6) {
        return `Với bé ${age} tháng, mình gợi ý các đồ chơi kích thích giác quan như mobile treo nôi, gương an toàn, và xúc xắc mềm. Bạn muốn xem sản phẩm không? 🧸`;
      } else if (age <= 12) {
        return `Bé ${age} tháng đang trong giai đoạn khám phá! Mình gợi ý khối gỗ lớn, hộp thả hình, và bóng mềm. Các sản phẩm Grella đều an toàn tuyệt đối! 🎨`;
      } else if (age <= 24) {
        return `Bé ${age} tháng đang học tự lập! Tháp xếp chồng, đồ chơi kéo/đẩy, và ghép hình đơn giản sẽ rất phù hợp. Bạn có muốn xem sản phẩm không? 🌟`;
      } else {
        return `Với bé ${age} tháng, đồ chơi xếp hình phức tạp, bộ đồ chơi vai trò, và tranh ghép sẽ giúp phát triển tư duy sáng tạo! 🎯`;
      }
    }
    
    // Hỏi về Montessori
    if (input.includes('montessori')) {
      return "Montessori là phương pháp giáo dục tập trung vào tự lập và học qua làm. Đồ chơi Grella được thiết kế theo nguyên tắc này, giúp bé phát triển tự nhiên. Bạn muốn tìm hiểu thêm không? 📚";
    }
    
    // Hỏi về bã cà phê
    if (input.includes('bã cà phê') || input.includes('cà phê') || input.includes('vật liệu')) {
      return "Grella tái chế bã cà phê thành đồ chơi an toàn! Chúng mình xử lý sạch, khử mùi, kết hợp keo sinh học không độc hại. 100% an toàn cho bé và thân thiện môi trường! ♻️";
    }
    
    // Hỏi về giá
    if (input.includes('giá') || input.includes('bao nhiêu') || input.includes('tiền')) {
      return "Sản phẩm Grella có giá từ 400,000₫ đến 760,000₫ tùy loại. Bạn có thể xem chi tiết tại trang Sản phẩm. Mình có thể giúp bạn tìm sản phẩm phù hợp ngân sách không? 💰";
    }
    
    // Hỏi về an toàn
    if (input.includes('an toàn') || input.includes('độc hại') || input.includes('hóa chất')) {
      return "Sản phẩm Grella 100% an toàn! Không chứa BPA, phthalates hay hóa chất độc hại. Được kiểm định nghiêm ngặt, phù hợp cho bé từ 0 tuổi. Bạn yên tâm nhé! ✅";
    }
    
    // Hỏi về vệ sinh
    if (input.includes('vệ sinh') || input.includes('lau') || input.includes('rửa')) {
      return "Để vệ sinh đồ chơi Grella: dùng khăn ẩm lau nhẹ, tránh ngâm nước. Có thể dùng xà phòng nhẹ cho vệ sinh sâu. Mình có bài hướng dẫn chi tiết trên Blog nhé! 🧼";
    }
    
    // Hỏi về giao hàng
    if (input.includes('giao hàng') || input.includes('ship') || input.includes('vận chuyển')) {
      return "Grella giao hàng toàn quốc, đóng gói thân thiện môi trường. Thời gian giao hàng 2-5 ngày tùy khu vực. Bạn muốn đặt hàng không? 📦";
    }
    
    // Hỏi về sản phẩm
    if (input.includes('sản phẩm') || input.includes('đồ chơi') || input.includes('xem')) {
      return "Grella có nhiều sản phẩm đồ chơi Montessori từ bã cà phê! Bạn có thể xem tất cả tại trang Sản phẩm hoặc cho mình biết độ tuổi bé để mình gợi ý phù hợp nhé! 🎁";
    }
    
    // Cảm ơn
    if (input.includes('cảm ơn') || input.includes('thank')) {
      return "Rất vui được hỗ trợ bạn! Nếu có thắc mắc gì, cứ hỏi mình nhé. Chúc bé phát triển khỏe mạnh! 🌟";
    }
    
    // Tạm biệt
    if (input.includes('tạm biệt') || input.includes('bye') || input.includes('chào tạm biệt')) {
      return "Tạm biệt! Hẹn gặp lại bạn. Đừng quên ghé thăm Grella nhé! 👋";
    }
    
    // Mặc định
    return "Mình có thể giúp bạn về: 🧸 Chọn đồ chơi theo độ tuổi, 📚 Phương pháp Montessori, ♻️ Vật liệu bã cà phê, 💰 Giá cả, ✅ An toàn sản phẩm. Bạn muốn hỏi về điều gì?";
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
        "name": "Grella",
        "url": "https://your-site.example/",
        "logo": "https://your-site.example/logo.png",
        "sameAs": ["https://facebook.com/yourpage", "https://instagram.com/yourpage"]
      },
      {
        "@type": "WebPage",
        "@id": "https://your-site.example/home",
        "url": "https://your-site.example/",
        "name": "Grella - Đồ chơi Montessori từ bã cà phê",
        "description":
          "Grella tái chế bã cà phê thành đồ chơi Montessori an toàn cho trẻ. Phát triển tư duy, thân thiện môi trường."
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
        <title>Grella — Đồ chơi Montessori từ bã cà phê | An toàn & Thân thiện môi trường</title>
        <meta name="description" content="Grella tái chế bã cà phê thành đồ chơi Montessori an toàn cho bé. Phát triển kỹ năng, thân thiện môi trường." />
        <link rel="canonical" href="https://your-site.example/" />
        {/* Open Graph */}
        <meta property="og:title" content="Grella — Đồ chơi Montessori từ bã cà phê" />
        <meta property="og:description" content="Đồ chơi Grella giúp bé học qua chơi, tái chế bã cà phê, an toàn, không hóa chất." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://your-site.example/og-image.png" />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA]">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#704214] mb-4"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              🧸
            </motion.span>
            {" Grella — Đồ chơi Montessori từ bã cà phê"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg text-[#5a4633] max-w-3xl mx-auto"
          >
            Biến bã cà phê thành đồ chơi giáo dục — an toàn, không hoá chất, giúp bé khám phá theo phương pháp Montessori.
          </motion.p>

          {/* <motion.img
            src="/images/hero-banner.jpg"
            alt="Đồ chơi từ bã cà phê - Grella"
            loading="lazy"
            className="mx-auto mt-8 rounded-2xl shadow-xl max-w-4xl w-full object-cover border-4 border-white/60"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          /> */}
        </motion.section>

        {/* STORY (bã cà phê) */}
        <section className="bg-[#FFF9E6] py-12 px-6">
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
                className="text-3xl font-bold text-[#704214] mb-4"
              >
                ☕ Câu chuyện từ bã cà phê
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#5a4633] leading-relaxed"
              >
                Mỗi năm, hàng triệu tấn bã cà phê bị bỏ đi. Grella chọn con đường cải tiến: tái chế bã cà phê
                để tạo ra vật liệu sinh học, an toàn cho trẻ, giảm rác thải và kích thích sáng tạo.
                Chúng tôi xử lý sạch bã, kết hợp keo sinh học an toàn và tạo khuôn khéo léo để ra đời món
                đồ chơi vừa bền vừa nhẹ, phù hợp phương pháp Montessori.
              </motion.p>

              <motion.ul 
                className="mt-4 text-sm text-[#5a4633] space-y-2"
              >
                {[
                  "Sử dụng bã cà phê đã qua xử lý, không còn mùi, không dùng hoá chất độc hại.",
                  "Thiết kế theo nguyên tắc Montessori: tối giản, kích thích giác quan.",
                  "Đóng gói & vận chuyển thân thiện môi trường."
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
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
                alt="Tái chế bã cà phê"
                loading="lazy"
                className="w-full h-64 object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* MONTESSORI */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-[#2E7D32] mb-4"
            >
              🎓 Phương pháp Montessori
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#2E4D25] max-w-3xl mx-auto"
            >
              Montessori đề cao trải nghiệm tự nhiên, tôn trọng bước phát triển riêng của mỗi bé.
              Đồ chơi Grella hỗ trợ phát triển vận động tinh, tư duy logic và khả năng tập trung.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Tự lập", desc: "Đồ chơi giúp bé làm được việc nhỏ một mình." },
                { title: "Thực hành", desc: "Học qua thao tác & khám phá giác quan." },
                { title: "An toàn", desc: "Vật liệu không độc hại, bề mặt mịn." }
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
                  <h3 className="font-semibold text-[#2E7D32]">{item.title}</h3>
                  <p className="text-sm text-[#2E4D25] mt-2">{item.desc}</p>
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
              className="text-3xl font-bold text-[#704214]"
            >
              🧸 Sản phẩm nổi bật
            </motion.h2>
            <Link 
              to="/products" 
              className="text-sm text-[#a64b4b] hover:text-[#704214] font-medium underline transition"
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
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
                >
                  <Link to={`/product/${p._id}`} className="block">
                    <img
                      src={p.img || "https://via.placeholder.com/600x360"}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-52 object-cover"
                    />
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link to={`/product/${p._id}`} className="font-semibold text-lg text-[#704214] hover:text-[#a64b4b]">
                      {p.name}
                    </Link>

                    <div className="text-[#2e7d32] font-bold mt-2">{(p.price || 0).toLocaleString("vi-VN")}₫</div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{p.desc}</p>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart({ id: p._id, name: p.name, price: p.price, img: p.img })}
                        className="px-4 py-2 bg-[#A8E6CF] text-[#225544] rounded-full transition hover:opacity-95"
                        aria-label={`Thêm ${p.name} vào giỏ`}
                      >
                        🛒 Thêm
                      </motion.button>

                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Link to={`/product/${p._id}`} className="text-sm text-[#a64b4b] underline">Xem chi tiết</Link>
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
          className="py-8 px-6 mt-8 bg-[#F9F7F5]"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="font-bold text-[#704214]">Grella</div>
              <div className="text-sm text-[#5a4633] mt-2">Đồ chơi Montessori từ bã cà phê — an toàn & thân thiện môi trường.</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-[#5a4633]"
            >
              <div>📞 Hotline: 0123-456-789</div>
              <div>📧 Email: hello@grella.example</div>
              <div className="mt-2">© {new Date().getFullYear()} Grella. All rights reserved.</div>
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
                className="bg-[#FFB7B2] text-white p-4 rounded-full shadow-lg hover:bg-[#ffa3a0] transition text-2xl"
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
                className="bg-white rounded-3xl w-80 h-96 shadow-xl border border-[#FFD6A5] flex flex-col"
                role="dialog"
                aria-label="Grella chat"
              >
                <div className="bg-[#A8E6CF] text-[#225544] px-4 py-2 rounded-t-3xl flex justify-between items-center font-semibold">
                  Grella Bot 🌼
                  <button onClick={() => setIsChatOpen(false)} aria-label="Đóng chat">✖</button>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-2">
                  {messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: m.sender === "bot" ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`p-2 rounded-xl max-w-[80%] text-sm ${m.sender === "bot" ? "bg-[#FFF5B1] text-[#704214] self-start" : "bg-[#FFB7B2] text-[#703030] self-end ml-auto"}`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  
                  {/* Quick reply buttons */}
                  {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['0-6 tháng', '6-12 tháng', '1-2 tuổi', '2-3 tuổi'].map((age) => (
                        <button
                          key={age}
                          onClick={() => {
                            setInput(age);
                            setTimeout(() => handleSend(), 100);
                          }}
                          className="px-3 py-1 bg-white border border-[#A8E6CF] text-[#225544] rounded-full text-xs hover:bg-[#A8E6CF] transition"
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-2 border-t">
                  {/* Suggested questions */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {['Giá bao nhiêu?', 'An toàn không?', 'Montessori là gì?'].map((q) => (
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
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleSend} className="bg-[#A8E6CF] text-[#225544] px-3 py-1 rounded-full">
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
