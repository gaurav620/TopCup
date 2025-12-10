'use client';

import { BarChart3, TrendingUp, DollarSign, Package, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Statistics() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Performance Statistics</h1>
                <p className="text-gray-600 mt-1">Track your delivery performance</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white"
                >
                    <Package className="w-10 h-10 mb-4 opacity-80" />
                    <p className="text-4xl font-bold mb-2">245</p>
                    <p className="text-white/80">Total Deliveries</p>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+15% from last month</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
                >
                    <DollarSign className="w-10 h-10 mb-4 opacity-80" />
                    <p className="text-4xl font-bold mb-2">₹45,890</p>
                    <p className="text-white/80">Total Earnings</p>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+22% from last month</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white"
                >
                    <Star className="w-10 h-10 mb-4 opacity-80" />
                    <p className="text-4xl font-bold mb-2">4.8</p>
                    <p className="text-white/80">Average Rating</p>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                        <span>Based on 180 ratings</span>
                    </div>
                </motion.div>
            </div>

            {/* This Week Stats */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">This Week Performance</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <Package className="w-8 h-8 text-blue-600 mb-3" />
                        <p className="text-2xl font-bold text-gray-900">56</p>
                        <p className="text-sm text-gray-600">Deliveries</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                        <p className="text-2xl font-bold text-gray-900">₹10,540</p>
                        <p className="text-sm text-gray-600">Earnings</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <Clock className="w-8 h-8 text-purple-600 mb-3" />
                        <p className="text-2xl font-bold text-gray-900">17 min</p>
                        <p className="text-sm text-gray-600">Avg Time</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <Star className="w-8 h-8 text-yellow-600 mb-3" />
                        <p className="text-2xl font-bold text-gray-900">4.9</p>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                </div>
            </div>

            {/* Daily Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Breakdown</h2>
                <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                        const deliveries = [8, 12, 10, 14, 11, 9, 6][index];
                        const earnings = [1520, 2280, 1900, 2660, 2090, 1710, 1140][index];
                        const maxDeliveries = 14;
                        const percentage = (deliveries / maxDeliveries) * 100;

                        return (
                            <div key={day}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-gray-700">{day}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">{deliveries} deliveries</span>
                                        <span className="font-bold text-teal-600">₹{earnings}</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-600"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">Top Performer! 🎉</h3>
                        <p className="text-white/90 text-sm">
                            You're in the top 10% of delivery partners this month. Keep up the excellent work!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
