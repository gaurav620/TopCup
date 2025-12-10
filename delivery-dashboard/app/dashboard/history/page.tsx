'use client';

import { CheckCircle, Clock, DollarSign, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DeliveryHistory() {
    const [dateFilter, setDateFilter] = useState('today');

    const completedOrders = [
        {
            id: 'ORD-2390',
            customer: 'Neha Gupta',
            items: '2x Pastries, 1x Coffee',
            address: 'Sector 29, Gurgaon',
            completedAt: '11:45 AM',
            duration: '15 min',
            earnings: '₹320',
            rating: 5
        },
        {
            id: 'ORD-2388',
            customer: 'Rohan Das',
            items: '1x Birthday Cake',
            address: 'DLF Cyber City',
            completedAt: '10:30 AM',
            duration: '20 min',
            earnings: '₹750',
            rating: 5
        },
        {
            id: 'ORD-2385',
            customer: 'Anita Verma',
            items: '3x Cupcakes, 1x Gift Box',
            address: 'Golf Course Road',
            completedAt: '9:15 AM',
            duration: '18 min',
            earnings: '₹580',
            rating: 4
        },
        {
            id: 'ORD-2382',
            customer: 'Karan Malhotra',
            items: '1x Snacks Combo',
            address: 'MG Road',
            completedAt: '8:50 AM',
            duration: '12 min',
            earnings: '₹240',
            rating: 5
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Delivery History</h1>
                <p className="text-gray-600 mt-1">Your completed deliveries</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                    <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-white/80">Completed heute</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                    <DollarSign className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-2xl font-bold">₹1,890</p>
                    <p className="text-sm text-white/80">Earned Today</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
                    <Clock className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-2xl font-bold">18 min</p>
                    <p className="text-sm text-white/80">Avg Time</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-5 text-white">
                    <Star className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-white/80">Avg Rating</p>
                </div>
            </div>

            {/* Date Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setDateFilter('today')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${dateFilter === 'today'
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Today
                </button>
                <button
                    onClick={() => setDateFilter('week')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${dateFilter === 'week'
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    This Week
                </button>
                <button
                    onClick={() => setDateFilter('month')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${dateFilter === 'month'
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    This Month
                </button>
            </div>

            {/* Completed Orders List */}
            <div className="space-y-3">
                {completedOrders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <h3 className="font-bold text-gray-900">{order.customer}</h3>
                                    <span className="text-xs font-semibold text-gray-500">#{order.id}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{order.items}</p>
                                <p className="text-xs text-gray-500">{order.address}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-600">{order.earnings}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-semibold text-gray-700">{order.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
                            <span className="text-gray-600">
                                <Clock className="w-3.5 h-3.5 inline mr-1" />
                                {order.duration}
                            </span>
                            <span className="font-semibold text-gray-700">Completed at {order.completedAt}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
