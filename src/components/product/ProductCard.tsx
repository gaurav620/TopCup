'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Badge from '@/components/ui/Badge';

import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const addItem = useCartStore((state: { addItem: (item: CartItem) => void }) => state.addItem);

    // Wishlist store integration
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Initialize wishlist state from store
    useEffect(() => {
        setIsWishlisted(isInWishlist(product._id));
    }, [product._id, isInWishlist]);

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
            quantity: 1,
            discountPrice: product.discountPrice,
            image: product.images[0],
            weight: product.weight,
        });
        toast.success(`${product.name} added to cart!`);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isWishlisted) {
            removeFromWishlist(product._id);
            toast.success('Removed from wishlist');
        } else {
            addToWishlist({
                id: product._id,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice,
                image: product.images[0],
                category: product.category,
            });
            toast.success('Added to wishlist! ❤️');
        }

        setIsWishlisted(!isWishlisted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group h-full"
        >
            <Link href={`/products/${product.slug}`}>
                <div
                    className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-cream-100">
                        <Image
                            src={product.images[0] || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Gradient Overlay on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                            {discount > 0 && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -12 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                    <Badge variant="danger" size="sm">
                                        -{discount}% OFF
                                    </Badge>
                                </motion.div>
                            )}
                            {product.isBestseller && (
                                <Badge variant="warning" size="sm">
                                    ⭐ Bestseller
                                </Badge>
                            )}
                        </div>

                        {/* Wishlist Button */}
                        <motion.button
                            onClick={handleWishlist}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${isWishlisted
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500 shadow-lg'
                                }`}
                        >
                            <Heart className={`w-5 h-5 transition-transform duration-300 ${isWishlisted ? 'fill-current scale-110' : ''}`} />
                        </motion.button>

                        {/* Quick Add Button */}
                        {showQuickAdd && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                className="absolute bottom-3 left-3 right-3 z-10"
                            >
                                <motion.button
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors shadow-xl shadow-primary-500/30"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </motion.button>
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
