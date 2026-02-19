import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../api';

export default function WishPage() {
    const { id } = useParams();
    const [wish, setWish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tapCount, setTapCount] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [floatingHearts, setFloatingHearts] = useState([]);
    const REQUIRED_TAPS = 15;

    useEffect(() => {
        const fetchWish = async () => {
            try {
                setLoading(true);
                const endpoint = id === 'random' ? '/wishes/random' : `/wishes/${id}`;
                const response = await api.get(endpoint);
                setWish(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWish();
    }, [id]);

    const handleHeartTap = () => {
        if (isRevealed) return;

        const newTapCount = tapCount + 1;
        setTapCount(newTapCount);

        // Add floating heart animation
        const heartId = Date.now();
        setFloatingHearts(prev => [...prev, heartId]);
        setTimeout(() => {
            setFloatingHearts(prev => prev.filter(id => id !== heartId));
        }, 1000);

        // Check if revealed
        if (newTapCount >= REQUIRED_TAPS) {
            setTimeout(() => {
                setIsRevealed(true);
            }, 500);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-300/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center relative z-10"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full shadow-2xl mb-6"
                    >
                        <div className="flex items-center justify-center h-full text-4xl">💝</div>
                    </motion.div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Đang tải lời chúc...
                    </div>
                </motion.div>
            </div>
        );
    }

    if (error || !wish) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="text-6xl mb-4">😔</div>
                    <div className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy lời chúc</div>
                    <div className="text-gray-500">Vui lòng thử lại sau</div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Lời chúc - DearHim</title>
                <meta name="description" content="Lời chúc từ DearHim - Hộp quà dành cho nam giới" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Animated Floating Orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-pink-300/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>

                {/* Floating Sparkles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${10 + i * 15}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}

                {/* Floating Hearts on Tap */}
                <AnimatePresence>
                    {floatingHearts.map((heartId) => (
                        <motion.div
                            key={heartId}
                            initial={{
                                opacity: 1,
                                y: 0,
                                x: (Math.random() - 0.5) * 100,
                                scale: 1
                            }}
                            animate={{
                                opacity: 0,
                                y: -200,
                                scale: 1.5,
                                rotate: (Math.random() - 0.5) * 90
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute text-4xl pointer-events-none z-50"
                            style={{
                                left: '50%',
                                top: '50%',
                            }}
                        >
                            ❤️
                        </motion.div>
                    ))}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {!isRevealed ? (
                        // Heart Tapping Screen
                        <motion.div
                            key="tapping"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 max-w-3xl w-full"
                        >
                            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-white/60 relative overflow-hidden">
                                {/* Top Gradient Accent */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>

                                {/* Decorative Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

                                {/* Instructions */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center mb-8 relative"
                                >
                                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                        Nhấp vào trái tim để mở lời chúc
                                    </h2>
                                    <p className="text-gray-600 text-lg">
                                        Còn {REQUIRED_TAPS - tapCount} lần nữa
                                    </p>
                                </motion.div>

                                {/* Interactive Heart */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="text-center mb-8 relative"
                                >
                                    <motion.div
                                        whileTap={{ scale: 0.85 }}
                                        animate={tapCount > 0 ? {
                                            rotate: [0, -10, 10, -10, 10, 0],
                                        } : {}}
                                        transition={{ duration: 0.5 }}
                                        onClick={handleHeartTap}
                                        className="inline-flex items-center justify-center w-48 h-48 cursor-pointer relative"
                                    >
                                        {/* Progress Ring */}
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="90"
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth="8"
                                            />
                                            <motion.circle
                                                cx="96"
                                                cy="96"
                                                r="90"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                initial={{ strokeDasharray: "565.48", strokeDashoffset: "565.48" }}
                                                animate={{
                                                    strokeDashoffset: 565.48 - (565.48 * tapCount / REQUIRED_TAPS)
                                                }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#fbbf24" />
                                                    <stop offset="50%" stopColor="#ec4899" />
                                                    <stop offset="100%" stopColor="#a855f7" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* Heart Icon */}
                                        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-full shadow-2xl p-8 relative z-10">
                                            <motion.span
                                                className="text-8xl"
                                                animate={tapCount > 0 ? { scale: [1, 1.2, 1] } : {}}
                                                transition={{ duration: 0.3 }}
                                            >
                                                ❤️
                                            </motion.span>
                                        </div>

                                        {/* Pulsing Ring */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: 'linear-gradient(to bottom right, #fbbf24, #ec4899)',
                                            }}
                                            initial={{ scale: 1, opacity: 0.3 }}
                                            animate={{ scale: 1.2, opacity: 0 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        ></motion.div>
                                    </motion.div>
                                </motion.div>

                                {/* Progress Indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="flex justify-center gap-2">
                                        {[...Array(REQUIRED_TAPS)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.6 + i * 0.05 }}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i < tapCount
                                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg'
                                                    : 'bg-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        // Revealed Wish Screen
                        <motion.div
                            key="revealed"
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10 max-w-3xl w-full"
                        >
                            {/* Main Wish Card */}
                            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-white/60 relative overflow-hidden">
                                {/* Top Gradient Accent */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>

                                {/* Decorative Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="text-center mb-10 relative"
                                >
                                    <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-full shadow-2xl relative">
                                        <span className="text-6xl">💝</span>
                                        {/* Pulsing Ring */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full"
                                            initial={{ scale: 1, opacity: 0.6 }}
                                            animate={{ scale: 1.3, opacity: 0 }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        ></motion.div>
                                    </div>
                                </motion.div>

                                {/* Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="text-center mb-10 relative"
                                >
                                    <div className="inline-block bg-gradient-to-br from-purple-50 to-pink-50 px-8 py-6 rounded-3xl shadow-lg border border-purple-100">
                                        <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-relaxed">
                                            {wish.message}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Author */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="text-center mb-8 relative"
                                >
                                    <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        — {wish.creatorName || wish.author || 'DearHim'}
                                    </p>
                                </motion.div>

                                {/* Category Badge */}
                                {wish.category && wish.category !== 'general' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1, duration: 0.4 }}
                                        className="text-center mb-10"
                                    >
                                        <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-bold rounded-full shadow-md border border-purple-200">
                                            {getCategoryLabel(wish.category)}
                                        </span>
                                    </motion.div>
                                )}

                                {/* Divider */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1.1, duration: 0.6 }}
                                    className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mb-10"
                                ></motion.div>

                                {/* CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.3, duration: 0.6 }}
                                    className="text-center"
                                >
                                    <a
                                        href="/"
                                        className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Tạo hộp quà của bạn</span>
                                        {/* Hover Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        ></motion.div>
                                    </a>
                                </motion.div>
                            </div>

                            {/* DearHim Watermark */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.6 }}
                                className="text-center mt-8"
                            >
                                <p className="text-sm text-gray-600">
                                    Powered by <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">DearHim</span> — Hộp quà dành cho nam
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

// Helper function to get category labels
function getCategoryLabel(category) {
    const labels = {
        birthday: 'Sinh nhật',
        love: 'Tình yêu',
        thanks: 'Cảm ơn',
        father: 'Dành cho bố',
        anniversary: 'Kỷ niệm',
        general: 'Chung'
    };
    return labels[category] || 'Chung';
}
