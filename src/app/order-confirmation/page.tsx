'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Home, ShoppingBag, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                setIsLoading(false);
                return;
            }

            try {
                // For demo orders, use mock data
                if (orderId.includes('DEMO') || orderId.includes('demo')) {
                    setOrder({
                        orderNumber: orderId,
                        createdAt: new Date().toISOString(),
                        orderStatus: 'confirmed',
                        totalPrice: 0,
                        isDemoOrder: true,
                    });
                    setIsLoading(false);
                    return;
                }

                // Fetch real order from API
                const res = await fetch('/api/orders');

                if (!res.ok) {
                    throw new Error('Failed to fetch order');
                }

                const data = await res.json();
                const foundOrder = data.orders?.find((o: any) => o._id === orderId || o.orderNumber === orderId);

                if (foundOrder) {
                    setOrder(foundOrder);
                } else {
                    // If not found in user's orders, still show confirmation with basic info
                    setOrder({
                        orderNumber: orderId,
                        createdAt: new Date().toISOString(),
                        orderStatus: 'confirmed',
                        isDemoOrder: true,
                    });
                }
            } catch (err: any) {
                console.error('Error fetching order:', err);
                setError(err.message || 'Failed to load order details');
                // Still show confirmation even on error
                setOrder({
                    orderNumber: orderId || 'N/A',
                    createdAt: new Date().toISOString(),
                    orderStatus: 'confirmed',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-50 py-12">
            <div className="container-custom max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-14 h-14 text-green-500" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Order Confirmed! 🎉
                    </h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Thank you for your order. We&apos;ll start preparing it right away!
                    </p>

                    {/* Order ID */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="text-xl font-bold text-primary-600">{order?.orderNumber || orderId || 'N/A'}</p>
                    </div>

                    {/* Order Details */}
                    {order && !order.isDemoOrder && order.items && (
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
                            <div className="space-y-3">
                                {order.items.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image || '/images/placeholder.jpg'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-primary-600">₹{order.totalPrice}</span>
                            </div>
                        </div>
                    )}

                    {/* Delivery Address */}
                    {order?.shippingAddress && (
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-500" />
                                Delivery Address
                            </h2>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
                                <p className="text-gray-600 mt-1">{order.shippingAddress.addressLine1}</p>
                                {order.shippingAddress.addressLine2 && (
                                    <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>
                                )}
                                <p className="text-gray-600">
                                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                </p>
                                <p className="text-gray-600 mt-1">Phone: +91 {order.shippingAddress.phone}</p>
                            </div>
                        </div>
                    )}

                    {/* Order Timeline */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-gray-900">Order Placed</p>
                                <p className="text-sm text-gray-500">Your order has been confirmed</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-gray-400">Preparing</p>
                                <p className="text-sm text-gray-400">We&apos;re baking fresh for you</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Truck className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-gray-400">Out for Delivery</p>
                                <p className="text-sm text-gray-400">Your order is on the way</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Home className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-gray-400">Delivered</p>
                                <p className="text-sm text-gray-400">Enjoy your order!</p>
                            </div>
                        </div>
                    </div>

                    {/* Demo Mode Notice */}
                    {(order?.isDemoOrder || orderId?.includes('DEMO') || orderId?.includes('demo')) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                            <p className="text-amber-800 text-sm">
                                🎭 <strong>Demo Mode:</strong> This is a simulated order. In production,
                                orders would be saved to the database and real payment would be processed.
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/orders">
                            <Button variant="outline" leftIcon={<Package className="w-5 h-5" />}>
                                View All Orders
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button leftIcon={<ShoppingBag className="w-5 h-5" />}>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}
