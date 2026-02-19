import React, { useEffect, useState } from "react";
import api from "../api";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { resolveImageUrl } from "../utils/imageUrl";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useOutletContext();

  // Preset price ranges
  const priceRanges = [
    { label: "Dưới 400,000₫", min: 0, max: 400000 },
    { label: "400,000₫ - 410,000₫", min: 400000, max: 410000 },
    { label: "410,000₫ - 450,000₫", min: 410000, max: 450000 },
    { label: "450,000₫ - 560,000₫", min: 450000, max: 560000 },
    { label: "560,000₫ - 760,000₫", min: 560000, max: 760000 },
    { label: "Trên 760,000₫", min: 760000, max: Infinity },
  ];

  useEffect(() => {
    api
      .get("/products")
      .then((r) => {
        setProducts(r.data || []);
        setFilteredProducts(r.data || []);
      })
      .catch(() => {
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...products];

    // Search by name
    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange.min !== "") {
      result = result.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max !== "") {
      result = result.filter((p) => p.price <= Number(priceRange.max));
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [searchTerm, priceRange, sortBy, products]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    setSelectedPriceRange("");
    setSortBy("default");
  };

  const handlePriceRangeSelect = (range) => {
    setSelectedPriceRange(range.label);
    setPriceRange({ min: range.min, max: range.max === Infinity ? "" : range.max });
  };

  return (
    <>
      <Helmet>
        <title>Sản phẩm - DearHim | Hộp quà dành cho nam giới</title>
        <meta
          name="description"
          content="Khám phá bộ sưu tập hộp quà tinh tế dành cho nam giới. Thiệp viết tay, ảnh in đẹp, quà chọn lọc."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-[#1e3a5f] mb-2">
              Hộp quà DearHim
            </h1>
            <p className="text-[#2c5f8d]">
              Hộp quà dành cho nam - Thiệp tay, ảnh in đẹp & Quà chọn lọc
            </p>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-white to-[#FFF9E6] rounded-3xl shadow-lg p-8 mb-8 border border-[#FFE5B4]/30"
          >
            {/* Search by name */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-[#704214] mb-3">
                🔍 Tìm kiếm sản phẩm
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
                className="w-full px-5 py-3 border-2 border-[#FFE5B4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition text-[#704214] placeholder-gray-400"
              />
            </div>

            {/* Sort */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-[#704214] mb-3">
                🔄 Sắp xếp
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-64 px-5 py-3 border-2 border-[#FFE5B4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition text-[#704214] font-medium bg-white cursor-pointer"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name">Tên: A-Z</option>
              </select>
            </div>

            {/* Results and Reset */}
            <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t-2 border-[#FFE5B4]">
              <div className="text-[#704214] font-medium">
                Tìm thấy <span className="font-bold text-[#d4af37] text-xl">{filteredProducts.length}</span> sản phẩm
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetFilters}
                className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-white rounded-xl hover:shadow-lg transition font-semibold"
              >
                ↻ Đặt lại bộ lọc
              </motion.button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-xl text-[#1e3a5f] font-semibold mb-2">
                  Không tìm thấy hộp quà
                </div>
                <div className="text-[#2c5f8d]">
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                </div>
              </motion.div>
            ) : (
              filteredProducts.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
                >
                  <Link to={`/product/${p._id}`} className="block">
                    <img
                      src={resolveImageUrl(Array.isArray(p.img) ? p.img[0] : p.img) || "https://via.placeholder.com/600x360"}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link
                      to={`/product/${p._id}`}
                      className="font-semibold text-lg text-[#1e3a5f] hover:text-[#2c5f8d] transition"
                    >
                      {p.name}
                    </Link>

                    <div className="text-[#d4af37] font-bold text-xl mt-2">
                      {(p.price || 0).toLocaleString("vi-VN")}₫
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">
                      {p.desc}
                    </p>

                    {/* Stock indicator */}
                    {p.stock !== undefined && (
                      <div className="text-xs text-gray-500 mt-2">
                        {p.stock > 0 ? (
                          <span className="text-green-600">Còn hàng ({p.stock})</span>
                        ) : (
                          <span className="text-red-600">Hết hàng</span>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          addToCart({
                            id: p._id,
                            name: p.name,
                            price: p.price,
                            img: p.img,
                          })
                        }
                        disabled={p.stock === 0}
                        className={`flex-1 px-4 py-2 rounded-full transition ${p.stock === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-white hover:opacity-90 font-bold"
                          }`}
                        aria-label={`Thêm ${p.name} vào giỏ`}
                      >
                        Thêm vào giỏ
                      </motion.button>

                      <Link
                        to={`/product/${p._id}`}
                        className="text-sm text-[#1e3a5f] font-semibold hover:text-[#2c5f8d] transition"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Back to home link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#1e3a5f] text-white rounded-full hover:bg-[#2c5f8d] transition"
            >
              ← Về trang chủ
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
