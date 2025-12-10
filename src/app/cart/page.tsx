'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getSubtotal } = useCartStore();
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    const subtotal = getSubtotal();
    const discount = appliedCoupon ? subtotal * 0.2 : 0; // 20% discount
    const deliveryCharge = subtotal >= 499 ? 0 : 49;
    const total = subtotal - discount + deliveryCharge;

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === 'WELCOME20') {
            setAppliedCoupon(couponCode.toUpperCase());
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 rounded-full bg-cream-100 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-primary-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items yet</p>
                <Link href="/products">
                    <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm"
                            >
                                <div className="flex gap-4">
                                    {/* Image */}
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                                        <Image
                                            src={item.image || '/images/placeholder.jpg'}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                {item.weight && (
                                                    <p className="text-sm text-gray-500">{item.weight}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-end justify-between mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-primary-600">
                                                    ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}
                                                </p>
                                                {item.discountPrice && (
                                                    <p className="text-sm text-gray-400 line-through">
                                                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Clear Cart */}
                        <div className="flex justify-between items-center pt-4">
                            <Link href="/products" className="text-primary-600 hover:underline font-medium">
                                ← Continue Shopping
                            </Link>
                            <button
                                onClick={clearCart}
                                className="text-red-500 hover:text-red-600 font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Coupon */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    />
                                    <Button onClick={handleApplyCoupon} variant="outline">
                                        Apply
                                    </Button>
                                </div>
                                {appliedCoupon && (
                                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                                        <Tag className="w-4 h-4" />
                                        {appliedCoupon} applied - 20% off!
                                    </p>
                                )}
                                {!appliedCoupon && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Try: WELCOME20 for 20% off
                                    </p>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Truck className="w-4 h-4" />
                                        Delivery
                                    </span>
                                    <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                                        {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                                    </span>
                                </div>
                                {deliveryCharge > 0 && (
                                    <p className="text-xs text-gray-500">
                                        Free delivery on orders above ₹499
                                    </p>
                                )}
                                <div className="border-t border-gray-100 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button fullWidth size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                    <span>🔒 Secure Checkout</span>
                                    <span>•</span>
                                    <span>🚚 Fast Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
