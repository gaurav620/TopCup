'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart as BarChartIcon, TrendingUp, DollarSign, ShoppingBag, Users, Package, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnalyticsPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth !== 'true') {
            router.push('/');
        } else {
            setIsAuth(true);
            fetchStats();
        }
    }, [router]);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/stats');
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuth || loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <BarChartIcon className="w-7 h-7 text-orange-600" />
                                Analytics
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Sales & performance metrics</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="w-12 h-12 opacity-80" />
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+12.5%</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">₹{stats.totalRevenue.toLocaleString()}</p>
                        <p className="text-green-100">Total Revenue</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <ShoppingBag className="w-12 h-12 opacity-80" />
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+8.2%</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.totalOrders}</p>
                        <p className="text-blue-100">Total Orders</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg text-white"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Package className="w-12 h-12 opacity-80" />
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+2</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.totalProducts}</p>
                        <p className="text-purple-100">Total Products</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-lg text-white"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-12 h-12 opacity-80" />
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+15.3%</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.totalUsers}</p>
                        <p className="text-orange-100">Total Users</p>
                    </motion.div>
                </div>

                {/* Charts Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Revenue Chart Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-md"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Revenue Trend
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                            <div className="text-center">
                                <BarChartIcon className="w-16 h-16 text-green-400 mx-auto mb-2" />
                                <p className="text-gray-600 font-medium">Revenue Chart</p>
                                <p className="text-sm text-gray-500">Monthly revenue visualization</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Orders Chart Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl p-6 shadow-md"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-blue-600" />
                            Orders Overview
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                            <div className="text-center">
                                <Package className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                                <p className="text-gray-600 font-medium">Orders Chart</p>
                                <p className="text-sm text-gray-500">Order status distribution</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Performance Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-md"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Average Order Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
                            </p>
                            <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">3.2%</p>
                            <p className="text-sm text-green-600 mt-1">+0.8% from last month</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Customer Retention</p>
                            <p className="text-2xl font-bold text-gray-900">68%</p>
                            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
