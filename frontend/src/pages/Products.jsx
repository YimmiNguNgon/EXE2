import React, { useEffect, useState } from "react";
import api from "../api";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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
        <title>Sản phẩm - Grella | Đồ chơi Montessori từ bã cà phê</title>
        <meta
          name="description"
          content="Khám phá bộ sưu tập đồ chơi Montessori từ bã cà phê của Grella. An toàn, thân thiện môi trường."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#FFF5B1] via-[#FFEFEF] to-[#E8FBEA] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-[#704214] mb-2">
              🧸 Sản phẩm Grella
            </h1>
            <p className="text-[#5a4633]">
              Đồ chơi Montessori từ bã cà phê - An toàn & Thân thiện môi trường
            </p>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 mb-8"
          >
            {/* Search by name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#704214] mb-2">
                🔍 Tìm kiếm sản phẩm
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
              />
            </div>

            {/* Price Range Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#704214] mb-3">
                💰 Lọc theo khoảng giá
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {priceRanges.map((range, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePriceRangeSelect(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedPriceRange === range.label
                        ? "bg-[#A8E6CF] text-[#225544] shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#704214] mb-2">
                  💰 Giá tối thiểu (tùy chỉnh)
                </label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => {
                    setPriceRange({ ...priceRange, min: e.target.value });
                    setSelectedPriceRange("");
                  }}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#704214] mb-2">
                  💰 Giá tối đa (tùy chỉnh)
                </label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => {
                    setPriceRange({ ...priceRange, max: e.target.value });
                    setSelectedPriceRange("");
                  }}
                  placeholder="1000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-[#704214] mb-2">
                  📊 Sắp xếp
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name">Tên: A-Z</option>
                </select>
              </div>
            </div>

            {/* Reset button */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-[#5a4633]">
                Tìm thấy <span className="font-bold">{filteredProducts.length}</span> sản phẩm
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#FFB7B2] text-white rounded-lg hover:bg-[#ffa3a0] transition"
              >
                🔄 Đặt lại bộ lọc
              </button>
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
                <div className="text-xl text-[#704214] font-semibold mb-2">
                  Không tìm thấy sản phẩm
                </div>
                <div className="text-[#5a4633]">
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
                      src={p.img || "https://via.placeholder.com/600x360"}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link
                      to={`/product/${p._id}`}
                      className="font-semibold text-lg text-[#704214] hover:text-[#a64b4b] transition"
                    >
                      {p.name}
                    </Link>

                    <div className="text-[#2e7d32] font-bold text-xl mt-2">
                      {(p.price || 0).toLocaleString("vi-VN")}₫
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">
                      {p.desc}
                    </p>

                    {/* Stock indicator */}
                    {p.stock !== undefined && (
                      <div className="text-xs text-gray-500 mt-2">
                        {p.stock > 0 ? (
                          <span className="text-green-600">✓ Còn hàng ({p.stock})</span>
                        ) : (
                          <span className="text-red-600">✗ Hết hàng</span>
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
                        className={`flex-1 px-4 py-2 rounded-full transition ${
                          p.stock === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#A8E6CF] text-[#225544] hover:opacity-90"
                        }`}
                        aria-label={`Thêm ${p.name} vào giỏ`}
                      >
                        🛒 Thêm
                      </motion.button>

                      <Link
                        to={`/product/${p._id}`}
                        className="text-sm text-[#a64b4b] underline hover:text-[#704214] transition"
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
              className="inline-block px-6 py-3 bg-[#704214] text-white rounded-full hover:bg-[#8B5A2B] transition"
            >
              ← Về trang chủ
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
