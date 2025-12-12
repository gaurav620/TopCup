'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Users, ShoppingBag, TrendingUp, Settings, LogOut, BarChart, DollarSign, ArrowUpRight, Activity, Bike } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [adminName, setAdminName] = useState('Admin');
    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        const name = localStorage.getItem('adminUser');
        if (auth !== 'true') {
            router.push('/');
        } else {
            setIsAuth(true);
            setAdminName(name || 'Admin');
            fetchDashboardStats();
        }
    }, [router]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/stats');
            const data = await response.json();

            if (data.success) {
                setDashboardStats({
                    totalRevenue: data.stats.totalRevenue || 0,
                    totalOrders: data.stats.totalOrders || 0,
                    totalProducts: data.stats.totalProducts || 0,
                    totalUsers: data.stats.totalUsers || 0
                });
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        router.push('/');
    };

    if (!isAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format number with commas
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    const stats = [
        {
            title: 'Total Revenue',
            value: formatCurrency(dashboardStats.totalRevenue),
            change: '+12.5%',
            icon: DollarSign,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            title: 'Total Orders',
            value: formatNumber(dashboardStats.totalOrders),
            change: '+8.2%',
            icon: ShoppingBag,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            title: 'Total Products',
            value: formatNumber(dashboardStats.totalProducts),
            change: '+2',
            icon: Package,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            title: 'Total Users',
            value: formatNumber(dashboardStats.totalUsers),
            change: '+15.3%',
            icon: Users,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600'
        },
    ];

    const modules = [
        {
            title: 'User Management',
            description: 'Manage customers and team',
            icon: Users,
            href: '/users',
            color: 'from-purple-500 to-purple-600',
            count: `${formatNumber(dashboardStats.totalUsers)} users`
        },
        {
            title: 'Product Catalog',
            description: 'Manage inventory & pricing',
            icon: Package,
            href: '/products',
            color: 'from-blue-500 to-blue-600',
            count: `${formatNumber(dashboardStats.totalProducts)} products`
        },
        {
            title: 'Order Management',
            description: 'Process & track orders',
            icon: ShoppingBag,
            href: '/orders',
            color: 'from-green-500 to-green-600',
            count: `${formatNumber(dashboardStats.totalOrders)} orders`
        },
        {
            title: 'Delivery Partners',
            description: 'Manage delivery team',
            icon: Bike,
            href: '/deliverypartners',
            color: 'from-teal-500 to-cyan-600',
            count: 'Partners'
        },
        {
            title: 'Analytics',
            description: 'Sales & performance metrics',
            icon: BarChart,
            href: '/analytics',
            color: 'from-orange-500 to-orange-600',
            count: `${formatCurrency(dashboardStats.totalRevenue)} revenue`
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Settings className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    TopCup Admin
                                </h1>
                                <p className="text-sm text-gray-600">Welcome back, {adminName}!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
                                <Activity className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700">System Online</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                                <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                    <ArrowUpRight className="w-4 h-4" />
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Access Modules */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Management Modules</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {modules.map((module, index) => (
                            <Link key={module.title} href={module.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <module.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                                    <p className="text-sm font-semibold text-gray-500">{module.count}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-md"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Quick Overview</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors">
                                Today
                            </button>
                            <button className="px-4 py-2 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                                This Week
                            </button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                            <div className="flex items-center justify-center mb-2">
                                <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                                <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardStats.totalRevenue)}</p>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">Total Revenue</p>
                            <p className="text-sm text-green-600 mt-1 font-semibold">Real-time data</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                            <div className="flex items-center justify-center mb-2">
                                <ShoppingBag className="w-6 h-6 text-blue-600 mr-2" />
                                <p className="text-3xl font-bold text-gray-900">{formatNumber(dashboardStats.totalOrders)}</p>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">Total Orders</p>
                            <p className="text-sm text-blue-600 mt-1 font-semibold">Live from database</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-6 h-6 text-purple-600 mr-2" />
                                <p className="text-3xl font-bold text-gray-900">{formatNumber(dashboardStats.totalUsers)}</p>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">Total Users</p>
                            <p className="text-sm text-purple-600 mt-1 font-semibold">Updated now</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
