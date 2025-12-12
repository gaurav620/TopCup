// Christmas-themed hero section
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gift, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import ChristmasCountdown from './ChristmasCountdown';
import { useTranslation } from '@/hooks/useTranslation';

export default function ChristmasHero() {
  const { t } = useTranslation();

  return (
    <div className="christmas-hero">
      <div className="hero-overlay" />

      <div className="container-custom relative z-10">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Christmas Badge */}
          <motion.div
            className="christmas-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Sparkles className="w-4 h-4" />
            🎄 Christmas Special 2025 🎄
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-green-600 bg-clip-text text-transparent">
              Sweet Treats for Your
            </span>
            <br />
            <span className="text-gray-900">
              Christmas Celebrations
            </span>
          </motion.h1>

          {/* Subtitle - Elegant */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Indulge in festive flavors with up to 50% off on premium cakes &amp; gifts
          </motion.p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="text-xl">✨</span>
              <span className="text-sm font-medium text-gray-700">Up to 50% OFF</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="text-xl">🚚</span>
              <span className="text-sm font-medium text-gray-700">Free Delivery ₹999+</span>
            </div>
          </div>

          {/* Countdown */}
          <motion.div
            className="countdown-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="countdown-label">🎅 Christmas Countdown 🎅</p>
            <ChristmasCountdown />
          </motion.div>

          {/* CTAs - Modern & Clean */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <span className="text-xl">🎁</span>
                Shop Christmas Specials
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
            <Link href="/products?category=gifts">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200">
                View Gift Hampers
              </button>
            </Link>
          </div>

          {/* Floating Icons */}
          <div className="floating-icons">
            <div className="icon1">🎁</div>
            <div className="icon2">🎄</div>
            <div className="icon3">⛄</div>
            <div className="icon4">🔔</div>
            <div className="icon5">✨</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .christmas-hero {
          position: relative;
          background: linear-gradient(135deg, #C41E3A 0%, #165B33 50%, #C41E3A 100%);
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
          min-height: 85vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 60px 0;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .hero-content {
          text-align: center;
          color: white;
          position: relative;
        }

        .christmas-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 10px 24px;
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .christmas-gradient {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 32px;
          opacity: 0.95;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .countdown-container {
          margin-bottom: 40px;
        }

        .countdown-label {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-primary {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #1f2937;
          font-weight: 700;
          border: none;
          box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.4);
          font-weight: 600;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .floating-icons > div {
          position: absolute;
          font-size: 40px;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
        }

        .icon1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .icon2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .icon3 {
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .icon4 {
          bottom: 30%;
          right: 10%;
          animation-delay: 3s;
        }

        .icon5 {
          top: 50%;
          left: 5%;
          animation-delay: 1.5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @media (max-width: 768px) {
          .christmas-hero {
            min-height: 70vh;
            padding: 40px 0;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .christmas-badge {
            font-size: 12px;
            padding: 8px 16px;
          }

          .hero-ctas {
            flex-direction: column;
            align-items: stretch;
          }

          .floating-icons > div {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
