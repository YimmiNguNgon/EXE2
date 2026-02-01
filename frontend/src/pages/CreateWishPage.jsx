import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function CreateWishPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        message: '',
        category: 'general',
        creatorName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [createdWish, setCreatedWish] = useState(null);
    const [qrData, setQrData] = useState(null);

    const categories = [
        { value: 'general', label: 'Chung', emoji: '🎁', color: 'from-purple-400 to-pink-400' },
        { value: 'birthday', label: 'Sinh nhật', emoji: '🎂', color: 'from-yellow-400 to-orange-400' },
        { value: 'love', label: 'Tình yêu', emoji: '❤️', color: 'from-red-400 to-pink-500' },
        { value: 'thanks', label: 'Cảm ơn', emoji: '🙏', color: 'from-green-400 to-teal-400' },
        { value: 'father', label: 'Dành cho bố', emoji: '👨', color: 'from-blue-400 to-indigo-400' },
        { value: 'anniversary', label: 'Kỷ niệm', emoji: '💑', color: 'from-rose-400 to-red-400' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            setError('Vui lòng nhập lời chúc');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const wishResponse = await api.post('/wishes', {
                message: formData.message.trim(),
                category: formData.category,
                creatorName: formData.creatorName.trim() || 'DearHim'
            });

            setCreatedWish(wishResponse.data);

            const qrResponse = await api.get(`/wishes/${wishResponse.data._id}/qrcode`);
            setQrData(qrResponse.data);

            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Có lỗi xảy ra');
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 backdrop-blur-sm border border-white/20';
        notification.innerHTML = '<span class="text-lg">✅ Đã copy link!</span>';
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transition = 'all 0.3s';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    };

    const createAnother = () => {
        setFormData({ message: '', category: 'general', creatorName: '' });
        setCreatedWish(null);
        setQrData(null);
        setError(null);
    };

    // Success Screen
    if (createdWish && qrData) {
        return (
            <>
                <Helmet>
                    <title>Lời chúc đã tạo - DearHim</title>
                </Helmet>

                <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
                    {/* Floating Gradient Orbs */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-rose-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative z-10 max-w-3xl w-full"
                    >
                        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/60 relative overflow-hidden">
                            {/* Animated Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 opacity-50 blur-xl -z-10"></div>

                            {/* Success Header */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="text-center mb-8"
                            >
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 rounded-full shadow-2xl mb-6 relative">
                                    <motion.span
                                        className="text-5xl"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                    >
                                        ✓
                                    </motion.span>
                                    {/* Ripple Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-green-400 rounded-full"
                                        initial={{ scale: 1, opacity: 0.8 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    ></motion.div>
                                </div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                    Tạo lời chúc thành công!
                                </h1>
                                <p className="text-lg text-gray-600">
                                    QR code đã sẵn sàng. In và dán lên hộp quà DearHim!
                                </p>
                            </motion.div>

                            {/* QR Code Display */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-yellow-200/50 shadow-xl mb-8"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <motion.img
                                            src={`http://localhost:4000${qrData.qrCodeUrl}`}
                                            alt="QR Code"
                                            className="w-72 h-72 rounded-2xl shadow-2xl"
                                            initial={{ rotate: -5, scale: 0.9 }}
                                            animate={{ rotate: 0, scale: 1 }}
                                            transition={{ delay: 0.6 }}
                                        />
                                        {/* QR Code Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-200 blur-2xl opacity-30 -z-10"></div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="mt-6 text-center"
                                    >
                                        <p className="text-lg text-gray-700 max-w-md leading-relaxed mb-2">
                                            {createdWish.message}
                                        </p>
                                        <p className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            — {createdWish.creatorName}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Share Link */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mb-8"
                            >
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    Link chia sẻ:
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={qrData.wishUrl}
                                        readOnly
                                        className="flex-1 px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm text-gray-700 font-mono"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(qrData.wishUrl)}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-lg transition font-bold hover:scale-105"
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={() => window.print()}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition hover:scale-105"
                                >
                                    🖨️ In QR Code
                                </button>
                                <button
                                    onClick={createAnother}
                                    className="flex-1 px-8 py-4 bg-white border-3 border-purple-500 text-purple-700 font-bold text-lg rounded-2xl hover:bg-purple-50 transition hover:scale-105 shadow-lg"
                                >
                                    ➕ Tạo lời chúc mới
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }

    // Form Screen
    return (
        <>
            <Helmet>
                <title>Tạo lời chúc - DearHim</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative z-10 max-w-3xl w-full"
                >
                    <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/60 relative overflow-hidden">
                        {/* Gradient Accent */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>

                        {/* Header */}
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-full shadow-2xl mb-6"
                            >
                                <span className="text-5xl">✍️</span>
                            </motion.div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                Tạo lời chúc của bạn
                            </h1>
                            <p className="text-lg text-gray-600">
                                Viết lời chúc ý nghĩa, tạo QR code và dán lên hộp quà DearHim
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-7">
                            {/* Message */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    Lời chúc của bạn <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    maxLength="300"
                                    placeholder="Viết lời chúc ý nghĩa cho người nhận..."
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition text-gray-800 placeholder-gray-400 shadow-sm"
                                    required
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">
                                        💡 Hãy viết những lời chúc chân thành nhất
                                    </p>
                                    <p className="text-xs font-semibold text-gray-600">
                                        {formData.message.length}/300
                                    </p>
                                </div>
                            </motion.div>

                            {/* Category */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-sm font-bold text-gray-700 mb-4">
                                    Chọn chủ đề
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {categories.map((cat) => (
                                        <motion.button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative p-4 rounded-2xl border-2 transition font-semibold text-sm overflow-hidden ${formData.category === cat.value
                                                ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:shadow-md'
                                                }`}
                                        >
                                            {formData.category === cat.value && (
                                                <motion.div
                                                    layoutId="categoryBg"
                                                    className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10`}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{cat.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Creator Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    Tên người gửi (tùy chọn)
                                </label>
                                <input
                                    type="text"
                                    name="creatorName"
                                    value={formData.creatorName}
                                    onChange={handleChange}
                                    maxLength="50"
                                    placeholder="DearHim"
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition text-gray-800 placeholder-gray-400 shadow-sm"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Nếu để trống, sẽ hiển thị "DearHim"
                                </p>
                            </motion.div>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl font-medium"
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                            >
                                {loading && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {loading ? 'Đang tạo lời chúc...' : 'Tạo lời chúc & QR Code'}
                                </span>
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
