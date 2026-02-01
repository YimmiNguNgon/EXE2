import React, { useState } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function QRGenerator() {
  const [url, setUrl] = useState('http://localhost:5173/wish/random');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    try {
      const qr = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#1e3a5f',
          light: '#ffffff'
        }
      });
      setQrCode(qr);
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tạo QR code');
    }
    setLoading(false);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'dearhim-qr-code.png';
    link.href = qrCode;
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Tạo QR Code - DearHim</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-[#1e3a5f] mb-2">
              Tạo QR Code
            </h1>
            <p className="text-[#2c5f8d]">
              Tạo mã QR cho lời chúc DearHim
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            {/* Input URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                URL lời chúc
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                placeholder="http://localhost:5173/wish/random"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateQR}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Đang tạo...' : 'Tạo QR Code'}
            </button>

            {/* QR Code Display */}
            {qrCode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 text-center"
              >
                <div className="bg-slate-50 rounded-xl p-6 inline-block">
                  <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={downloadQR}
                    className="w-full px-6 py-3 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2c5f8d] transition"
                  >
                    📥 Tải về QR Code
                  </button>

                  <p className="text-sm text-slate-600">
                    Hướng dẫn: In QR code này lên thiệp quà, khách hàng quét để xem lời chúc!
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="font-bold text-[#1e3a5f] mb-3">📝 Hướng dẫn sử dụng:</h3>
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. Nhập URL lời chúc (mặc định: /wish/random)</li>
              <li>2. Nhấn "Tạo QR Code"</li>
              <li>3. Tải về file PNG</li>
              <li>4. In lên thiệp quà hoặc hộp quà</li>
              <li>5. Khách hàng quét QR để xem lời chúc!</li>
            </ol>
          </motion.div>
        </div>
      </div>
    </>
  );
}
