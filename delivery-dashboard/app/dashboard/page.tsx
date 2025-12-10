'use client';

import { Package, DollarSign, TrendingUp, Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardHome() {
    const stats = [
        {
            icon: Package,
            label: 'Active Orders',
            value: '5',
            change: '+2',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: DollarSign,
            label: "Today's Earnings",
            value: '₹450',
            change: '+₹120',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: TrendingUp,
            label: 'Completed Today',
            value: '12',
            change: '+5',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Clock,
            label: 'Avg Delivery Time',
            value: '18 min',
            change: '-2 min',
            color: 'from-orange-500 to-orange-600'
        },
    ];

    const activeOrders = [
        {
            id: 'ORD-2401',
            customer: 'Rahul Sharma',
            items: '2x Chocolate Cake, 1x Gift Box',
            address: 'MG Road, Sector 14, Gurgaon',
            status: 'ready-for-pickup',
            statusLabel: 'Ready for Pickup',
            phone: '+91 98765 43210',
            amount: '₹1,250'
        },
        {
            id: 'ORD-2402',
            customer: 'Priya Singh',
            items: '1x Birthday Cake, 3x Cupcakes',
            address: 'DLF Phase 3, Gurgaon',
            status: 'picked-up',
            statusLabel: 'Picked Up',
            phone: '+91 98765 43211',
            amount: '₹890'
        },
        {
            id: 'ORD-2403',
            customer: 'Amit Kumar',
            items: '1x Snacks Combo, 2x Beverages',
            address: 'Cyber City, Gurgaon',
            status: 'ready-for-pickup',
            statusLabel: 'Ready for Pickup',
            phone: '+91 98765 43212',
            amount: '₹650'
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, John! 👋</h1>
                <p className="text-gray-600 mt-1">Here's your delivery overview for today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Active Orders Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Active Orders</h2>
                    <Link
                        href="/dashboard/orders"
                        className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
                    >
                        View All →
                    </Link>
                </div>

                <div className="space-y-4">
                    {activeOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900">{order.customer}</h3>
                                        <span className="text-xs font-semibold text-gray-500">#{order.id}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{order.items}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'ready-for-pickup'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {order.statusLabel}
                                </span>
                            </div>

                            <div className="flex items-start gap-2 mb-3">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{order.address}</p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <a
                                    href={`tel:${order.phone}`}
                                    className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call Customer
                                </a>
                                <span className="font-bold text-gray-900">{order.amount}</span>
                            </div>

                            <div className="mt-3 flex gap-2">
                                {order.status === 'ready-for-pickup' ? (
                                    <button className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2.5 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
                                        Mark as Picked Up
                                    </button>
                                ) : (
                                    <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all">
                                        Mark as Delivered
                                    </button>
                                )}
                                <Link
                                    href={`/dashboard/orders/${order.id.toLowerCase()}`}
                                    className="px-6 py-2.5 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Keep up the great work!</h3>
                        <p className="text-white/80 text-sm">You're on track to beat yesterday's earnings</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">₹1,890</p>
                        <p className="text-white/80 text-sm">Total Earnings Today</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
