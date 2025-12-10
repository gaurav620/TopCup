'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, TrendingUp, Users, ShoppingBag, Plus, ArrowUpRight, Settings, BarChart3 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Total Revenue', value: '₹1,24,560', change: '+12.5%', up: true, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Total Orders', value: '234', change: '+8.2%', up: true, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Total Products', value: '48', change: '+2', up: true, icon: Package, color: 'bg-purple-500' },
    { label: 'Total Customers', value: '1,234', change: '+15.3%', up: true, icon: Users, color: 'bg-orange-500' },
];

const recentOrders = [
    { id: 'TC2412ABC', customer: 'Priya Sharma', total: 1499, status: 'confirmed', date: '2 mins ago' },
    { id: 'TC2412DEF', customer: 'Rahul Verma', total: 899, status: 'processing', date: '15 mins ago' },
    { id: 'TC2412GHI', customer: 'Ananya Patel', total: 2499, status: 'shipped', date: '1 hour ago' },
    { id: 'TC2412JKL', customer: 'Arjun Singh', total: 599, status: 'delivered', date: '3 hours ago' },
    { id: 'TC2412MNO', customer: 'Sneha Gupta', total: 1299, status: 'confirmed', date: '5 hours ago' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

const quickActions = [
    { title: 'Manage Products', desc: 'Add, edit inventory', icon: Package, href: '/admin/products', color: 'bg-blue-500' },
    { title: 'View Orders', desc: 'Process orders', icon: ShoppingBag, href: '/admin/orders', color: 'bg-green-500' },
    { title: 'Manage Users', desc: 'User & team management', icon: Users, href: '/admin/users', color: 'bg-purple-500' },
    { title: 'Analytics', desc: 'Sales & performance', icon: BarChart3, href: '/admin/analytics', color: 'bg-orange-500' },
];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?redirect=/admin');
        } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
            router.push('/');
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!session || session.user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Settings className="w-8 h-8 text-primary-600" />
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 mt-1">Welcome back, {session.user.name}! Here's your overview.</p>
                        </div>
                        <Link href="/admin/products/new">
                            <Button leftIcon={<Plus className="w-5 h-5" />} size="lg">
                                Add Product
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center shadow-md`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <span className="flex items-center text-sm font-semibold text-green-600">
                                    <ArrowUpRight className="w-4 h-4" />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    {quickActions.map((action, index) => (
                        <Link key={action.title} href={action.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="bg-white rounded-xl p-4 hover:shadow-lg transition-all hover:-translate-y-1 group"
                            >
                                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <action.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                                <p className="text-xs text-gray-600">{action.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-primary-600 text-sm font-medium hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {order.customer}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            ₹{order.total.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {order.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
