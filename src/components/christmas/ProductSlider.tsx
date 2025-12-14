// Dynamic product slider using keen-slider with enhanced animations
'use client';

import { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface SliderProduct {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images: string[];
    averageRating: number;
    category: string;
    badge?: string;
}

interface ProductSliderProps {
    products: SliderProduct[];
    title?: string;
}

export default function ProductSlider({ products, title = 'Featured Products' }: ProductSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slides: {
            perView: 4,
            spacing: 20,
        },
        breakpoints: {
            '(max-width: 1024px)': {
                slides: { perView: 3, spacing: 15 },
            },
            '(max-width: 768px)': {
                slides: { perView: 2, spacing: 10 },
            },
            '(max-width: 480px)': {
                slides: { perView: 1, spacing: 10 },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    // Auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            instanceRef.current?.next();
        }, 3000);

        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <div className="product-slider-container">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

                {loaded && instanceRef.current && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => instanceRef.current?.prev()}
                            className="slider-arrow"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => instanceRef.current?.next()}
                            className="slider-arrow"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <div ref={sliderRef} className="keen-slider">
                {products.map((product) => {
                    const discount = product.discountPrice
                        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                        : 0;

                    return (
                        <div key={product._id} className="keen-slider__slide">
                            <motion.div
                                className="product-card"
                                onHoverStart={() => setHoveredCard(product._id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link href={`/products/${product.slug}`}>
                                    <div className="product-image-container">
                                        {product.badge && (
                                            <motion.div
                                                className="product-badge"
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                {product.badge}
                                            </motion.div>
                                        )}
                                        {discount > 0 && (
                                            <motion.div
                                                className="discount-badge"
                                                initial={{ rotate: -10 }}
                                                animate={{ rotate: 10 }}
                                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                                            >
                                                -{discount}%
                                            </motion.div>
                                        )}
                                        <motion.div
                                            animate={{ scale: hoveredCard === product._id ? 1.05 : 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                className="product-image"
                                            />
                                        </motion.div>

                                        {/* Quick Action Buttons */}
                                        <motion.div
                                            className="quick-actions"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: hoveredCard === product._id ? 1 : 0,
                                                y: hoveredCard === product._id ? 0 : 10
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button className="quick-action-btn" aria-label="Add to cart">
                                                <ShoppingCart className="w-4 h-4" />
                                            </button>
                                            <button className="quick-action-btn" aria-label="Add to wishlist">
                                                <Heart className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    </div>

                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>

                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.2, rotate: 15 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Star
                                                        className={`w-4 h-4 ${i < Math.floor(product.averageRating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                </motion.div>
                                            ))}
                                            <span className="text-sm text-gray-600 ml-1">
                                                {product.averageRating}
                                            </span>
                                        </div>

                                        <div className="product-price">
                                            <motion.span
                                                className="price-current"
                                                animate={{ scale: hoveredCard === product._id ? 1.05 : 1 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                ₹{product.discountPrice || product.price}
                                            </motion.span>
                                            {product.discountPrice && (
                                                <span className="price-original">₹{product.price}</span>
                                            )}
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Button size="sm" fullWidth className="mt-3">
                                                View Details
                                            </Button>
                                        </motion.div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {loaded && instanceRef.current && (
                <div className="slider-dots">
                    {Array.from({ length: instanceRef.current.track.details.slides.length }, (_, idx) => (
                        <button
                            key={idx}
                            onClick={() => instanceRef.current?.moveToIdx(idx)}
                            className={`dot ${currentSlide === idx ? 'active' : ''}`}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
        .product-slider-container {
          margin: 40px 0;
        }

        .slider-arrow {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-center;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .slider-arrow:hover {
          background: #f97316;
          border-color: #f97316;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }

        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          border: 2px solid transparent;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
          border-color: rgba(249, 115, 22, 0.2);
        }

        .product-image-container {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
          background-size: 200% 100%;
          animation: shimmer 1.5s linear infinite;
        }

        @keyframes shimmer {
          to {
            background-position: -200% 0;
          }
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quick-actions {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .quick-action-btn {
          background: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s;
        }

        .quick-action-btn:hover {
          background: #f97316;
          color: white;
          transform: scale(1.1);
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .discount-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }

        .product-info {
          padding: 16px;
        }

        .product-name {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-current {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
        }

        .price-original {
          font-size: 14px;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dot.active {
          background: #f97316;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
}
