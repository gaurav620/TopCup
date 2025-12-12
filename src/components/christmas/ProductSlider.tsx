// Dynamic product slider using keen-slider
'use client';

import { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
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
                            <div className="product-card">
                                <Link href={`/products/${product.slug}`}>
                                    <div className="product-image-container">
                                        {product.badge && (
                                            <div className="product-badge">{product.badge}</div>
                                        )}
                                        {discount > 0 && (
                                            <div className="discount-badge">-{discount}%</div>
                                        )}
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            className="product-image"
                                        />
                                    </div>

                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>

                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.averageRating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-1">
                                                {product.averageRating}
                                            </span>
                                        </div>

                                        <div className="product-price">
                                            <span className="price-current">
                                                ₹{product.discountPrice || product.price}
                                            </span>
                                            {product.discountPrice && (
                                                <span className="price-original">₹{product.price}</span>
                                            )}
                                        </div>

                                        <Button size="sm" fullWidth className="mt-3">
                                            View Details
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {loaded && instanceRef.current && (
                <div className="slider-dots">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
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
          transition: all 0.3s;
        }

        .slider-arrow:hover {
          background: #f97316;
          border-color: #f97316;
          color: white;
        }

        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .product-image-container {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f97316;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          z-index: 2;
        }

        .discount-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #dc2626;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          z-index: 2;
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
