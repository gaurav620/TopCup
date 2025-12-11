'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Phone, Package, ArrowLeft, Clock, CheckCircle, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For now, use demo data matching the order ID
        const demoOrders: any = {
            'ord-2401': {
                id: 'ord-2401',
                orderNumber: '#ORD-2401',
                customer: { name: 'Rahul Sharma', phone: '+91 98765 43210' },
                items: [
                    { name: 'Chocolate Cake', quantity: 2, price: 350 },
                    { name: 'Gift Box', quantity: 1, price: 150 }
                ],
                total: 850,
                deliveryFee: 49,
                finalAmount: 899,
                address: {
                    street: 'MG Road, Sector 14',
                    city: 'Gurgaon',
                    zipCode: '122001',
                    fullAddress: 'MG Road, Sector 14, Gurgaon - 122001'
                },
                status: 'ready',
                expectedTime: '2:30 PM',
                createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
            },
            'ord-2402': {
                id: 'ord-2402',
                orderNumber: '#ORD-2402',
                customer: { name: 'Priya Singh', phone: '+91 98765 43211' },
                items: [
                    { name: 'Birthday Cake', quantity: 1, price: 500 },
                    { name: 'Cupcakes', quantity: 3, price: 100 }
                ],
                total: 800,
                deliveryFee: 49,
                finalAmount: 849,
                address: {
                    street: 'DLF Phase 3, Tower A',
                    city: 'Gurgaon',
                    zipCode: '122002',
                    fullAddress: 'DLF Phase 3, Tower A, Gurgaon - 122002'
                },
                status: 'out-for-delivery',
                expectedTime: '3:00 PM',
                createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 mins ago
            }
        };

        const orderId = params.id as string;
        const foundOrder = demoOrders[orderId];

        if (foundOrder) {
            setOrder(foundOrder);
        }
        setLoading(false);
    }, [params.id]);

    const handleStatusUpdate = (newStatus: string) => {
        setOrder({ ...order, status: newStatus });
        // In real app, make API call to update status
        alert(`Order status updated to: ${newStatus}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-6">This order doesn't exist or you don't have access to it.</p>
                    <Link
                        href="/dashboard/orders"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        const colors: any = {
            'ready': 'bg-orange-100 text-orange-700',
            'picked-up': 'bg-blue-100 text-blue-700',
            'out-for-delivery': 'bg-purple-100 text-purple-700',
            'delivered': 'bg-green-100 text-green-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const timeAgo = (date: Date) => {
        const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} mins ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/dashboard/orders"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Active Orders
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
                            <p className="text-gray-600 mt-1">Placed {timeAgo(order.createdAt)}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                            {order.status.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                        <Package className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.customer.name}</p>
                                        <p className="text-sm text-gray-600">Customer</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.customer.phone}</p>
                                        <a href={`tel:${order.customer.phone}`} className="text-sm text-blue-600 hover:underline">
                                            Call Customer
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-teal-600" />
                                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="font-medium text-gray-900">{order.address.fullAddress}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">Expected by: {order.expectedTime}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
                            <div className="space-y-3">
                                {order.items.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{order.total}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>₹{order.deliveryFee}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
                                    <span>Total</span>
                                    <span>₹{order.finalAmount}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                {order.status === 'ready' && (
                                    <button
                                        onClick={() => handleStatusUpdate('picked-up')}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700"
                                    >
                                        <Package className="w-5 h-5" />
                                        Mark as Picked Up
                                    </button>
                                )}
                                {order.status === 'picked-up' && (
                                    <button
                                        onClick={() => handleStatusUpdate('out-for-delivery')}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700"
                                    >
                                        <Truck className="w-5 h-5" />
                                        Start Delivery
                                    </button>
                                )}
                                {order.status === 'out-for-delivery' && (
                                    <button
                                        onClick={() => handleStatusUpdate('delivered')}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Mark as Delivered
                                    </button>
                                )}
                                <a
                                    href={`tel:${order.customer.phone}`}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Customer
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
