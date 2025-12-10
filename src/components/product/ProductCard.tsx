'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Badge from '@/components/ui/Badge';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    averageRating: number;
    totalReviews: number;
    isBestseller?: boolean;
    isFeatured?: boolean;
    weight?: string;
    shortDescription?: string;
}

interface ProductCardProps {
    product: Product;
    showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const discount = product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.images[0],
            weight: product.weight,
        });
        toast.success(`${product.name} added to cart!`);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <Link href={`/products/${product.slug}`}>
                <div
                    className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-cream-100">
                        <Image
                            src={product.images[0] || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {discount > 0 && (
                                <Badge variant="danger" size="sm">
                                    -{discount}%
                                </Badge>
                            )}
                            {product.isBestseller && (
                                <Badge variant="warning" size="sm">
                                    Bestseller
                                </Badge>
                            )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlist}
                            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        {/* Quick Add Button */}
                        {showQuickAdd && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                className="absolute bottom-3 left-3 right-3"
                            >
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors shadow-lg"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Category */}
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            {product.category}
                        </p>

                        {/* Name */}
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {product.name}
                        </h3>

                        {/* Weight */}
                        {product.weight && (
                            <p className="text-sm text-gray-500 mb-2">{product.weight}</p>
                        )}

                        {/* Rating */}
                        {product.totalReviews > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium">{product.averageRating.toFixed(1)}</span>
                                <span className="text-sm text-gray-400">({product.totalReviews})</span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary-600">
                                ₹{(product.discountPrice || product.price).toLocaleString('en-IN')}
                            </span>
                            {product.discountPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
