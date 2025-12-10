'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore, WishlistItem } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function WishlistPage() {
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const { addItem: addToCart } = useCartStore();

    const handleAddToCart = (item: WishlistItem) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            discountPrice: item.discountPrice,
            image: item.image,
        });
        removeItem(item.id);
        toast.success('Added to cart!');
    };

    const handleRemove = (id: string) => {
        removeItem(id);
        toast.success('Removed from wishlist');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream-50 py-12">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center"
                    >
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-primary-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
                        <p className="text-gray-600 mb-6">
                            Save items you love by clicking the heart icon on products
                        </p>
                        <Link href="/products">
                            <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                                Browse Products
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                        <p className="text-gray-600 mt-1">{items.length} items saved</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            clearWishlist();
                            toast.success('Wishlist cleared');
                        }}
                    >
                        Clear All
                    </Button>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Image */}
                                <Link href={`/products/${item.id}`}>
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {item.discountPrice && (
                                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">
                                        {item.category}
                                    </p>
                                    <Link href={`/products/${item.id}`}>
                                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-1">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-bold text-primary-600">
                                            ₹{item.discountPrice || item.price}
                                        </span>
                                        {item.discountPrice && (
                                            <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            fullWidth
                                            leftIcon={<ShoppingCart className="w-4 h-4" />}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </Button>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="p-2 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Continue Shopping */}
                <div className="mt-8 text-center">
                    <Link href="/products">
                        <Button variant="outline" leftIcon={<ShoppingBag className="w-5 h-5" />}>
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
