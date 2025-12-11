'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Eye, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Button from '@/components/ui/Button';

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    processing: { label: 'Processing', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
    out_for_delivery: { label: 'Out for Delivery', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-100' },
    delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    cancelled: { label: 'Cancelled', icon: Package, color: 'text-red-600', bg: 'bg-red-100' },
};

export default function OrdersPage() {
    const { data: session, status: authStatus } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            if (authStatus !== 'authenticated') {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const res = await fetch('/api/orders');

                if (!res.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await res.json();
                setOrders(data.orders || []);
                setIsDemoMode(data.demoMode || false);
            } catch (err: any) {
                console.error('Error fetching orders:', err);
                setError(err.message || 'Failed to load orders');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [authStatus]);


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }


    if (authStatus === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-cream-50 py-12">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center"
                    >
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-primary-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h1>
                        <p className="text-gray-600 mb-6">
                            Sign in to view your order history
                        </p>
                        <Link href="/login?redirect=/orders">
                            <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                                Sign In
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-cream-50 py-12">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center"
                    >
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-primary-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h1>
                        <p className="text-gray-600 mb-6">
                            You haven&apos;t placed any orders yet. Start shopping!
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
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">{orders.length} orders</p>
                </div>


                {/* Demo Notice */}
                {isDemoMode && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <p className="text-amber-800 text-sm">
                            🎭 <strong>Demo Mode:</strong> Showing sample orders. In production, real orders will be fetched from the database.
                        </p>
                    </div>
                )}


                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order, index) => {
                        const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                        const StatusIcon = statusInfo.icon;

                        return (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm"
                            >
                                {/* Order Header */}
                                <div className="p-4 md:p-6 border-b border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                                            <p className="text-sm text-gray-500">
                                                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bg}`}>
                                            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                {/* Order Items */}
                                <div className="p-4 md:p-6">
                                    <div className="space-y-3">
                                        {order.items.map((item: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold text-gray-900">₹{item.price}</p>
                                            </div>
                                        ))}
                                    </div>


                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="text-xl font-bold text-primary-600">₹{order.totalPrice}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={`/track-order/${order._id}`}>
                                                <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                                                    Track Order
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
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
