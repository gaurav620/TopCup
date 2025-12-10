'use client';

import { Package, MapPin, Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ActiveOrders() {
    const [filter, setFilter] = useState('all');

    const orders = [
        {
            id: 'ORD-2401',
            customer: 'Rahul Sharma',
            items: ['2x Chocolate Cake', '1x Gift Box'],
            address: 'MG Road, Sector 14, Gurgaon - 122001',
            status: 'ready-for-pickup',
            statusLabel: 'Ready for Pickup',
            phone: '+91 98765 43210',
            amount: '₹1,250',
            time: '2:30 PM',
            orderTime: '10 mins ago'
        },
        {
            id: 'ORD-2402',
            customer: 'Priya Singh',
            items: ['1x Birthday Cake', '3x Cupcakes'],
            address: 'DLF Phase 3, Gurgaon - 122002',
            status: 'picked-up',
            statusLabel: 'Picked Up - In Transit',
            phone: '+91 98765 43211',
            amount: '₹890',
            time: '3:00 PM',
            orderTime: '25 mins ago'
        },
        {
            id: 'ORD-2403',
            customer: 'Amit Kumar',
            items: ['1x Snacks Combo', '2x Beverages'],
            address: 'Cyber City, Gurgaon - 122002',
            status: 'ready-for-pickup',
            statusLabel: 'Ready for Pickup',
            phone: '+91 98765 43212',
            amount: '₹650',
            time: '3:15 PM',
            orderTime: '5 mins ago'
        },
        {
            id: 'ORD-2404',
            customer: 'Sneha Patel',
            items: ['3x Donuts', '1x Coffee'],
            address: 'Golf Course Road, Gurgaon - 122001',
            status: 'ready-for-pickup',
            statusLabel: 'Ready for Pickup',
            phone: '+91 98765 43213',
            amount: '₹420',
            time: '3:30 PM',
            orderTime: 'Just now'
        },
        {
            id: 'ORD-2405',
            customer: 'Vikram Mehta',
            items: ['1x Premium Gift Box', '2x Macarons'],
            address: 'Sohna Road, Gurgaon - 122018',
            status: 'picked-up',
            statusLabel: 'Picked Up - In Transit',
            phone: '+91 98765 43214',
            amount: '₹1,580',
            time: '2:45 PM',
            orderTime: '40 mins ago'
        },
    ];

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(o => o.status === filter);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Active Orders</h1>
                <p className="text-gray-600 mt-1">Manage your assigned deliveries</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${filter === 'all'
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    All Orders ({orders.length})
                </button>
                <button
                    onClick={() => setFilter('ready-for-pickup')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${filter === 'ready-for-pickup'
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    Ready for Pickup ({orders.filter(o => o.status === 'ready-for-pickup').length})
                </button>
                <button
                    onClick={() => setFilter('picked-up')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${filter === 'picked-up'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    In Transit ({orders.filter(o => o.status === 'picked-up').length})
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                        {/* Order Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Package className="w-5 h-5 text-teal-600" />
                                    <h3 className="font-bold text-gray-900">{order.customer}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold">#{order.id}</span>
                                    <span>•</span>
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{order.orderTime}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'ready-for-pickup'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                {order.statusLabel}
                            </span>
                        </div>

                        {/* Order Items */}
                        <div className="bg-gray-50 rounded-xl p-3 mb-3">
                            <p className="text-sm font-semibold text-gray-700 mb-1">Order Items:</p>
                            <ul className="space-y-1">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Delivery Address */}
                        <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-xl">
                            <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-blue-900 mb-0.5">Delivery Address</p>
                                <p className="text-sm text-blue-700">{order.address}</p>
                                <p className="text-xs text-blue-600 mt-1">Expected by: {order.time}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <a
                                href={`tel:${order.phone}`}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-all"
                            >
                                <Phone className="w-4 h-4" />
                                Call
                            </a>

                            {order.status === 'ready-for-pickup' ? (
                                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2.5 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
                                    <Package className="w-4 h-4" />
                                    Mark as Picked Up
                                </button>
                            ) : (
                                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all">
                                    <CheckCircle className="w-4 h-4" />
                                    Mark as Delivered
                                </button>
                            )}

                            <Link
                                href={`/dashboard/orders/${order.id.toLowerCase()}`}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-teal-200 text-teal-600 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-all"
                            >
                                Details
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Amount */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600">Order Amount:</span>
                            <span className="text-lg font-bold text-gray-900">{order.amount}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600">No {filter !== 'all' ? filter.replace('-', ' ') : ''} orders at the moment</p>
                </div>
            )}
        </div>
    );
}
