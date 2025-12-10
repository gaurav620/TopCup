import Link from 'next/link';
import { Package, TrendingUp, Users, ShoppingBag, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const stats = [
    { label: 'Total Revenue', value: '₹1,24,560', change: '+12.5%', up: true, icon: TrendingUp },
    { label: 'Total Orders', value: '234', change: '+8.2%', up: true, icon: ShoppingBag },
    { label: 'Total Products', value: '48', change: '+2', up: true, icon: Package },
    { label: 'Total Customers', value: '1,234', change: '+15.3%', up: true, icon: Users },
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

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
                        </div>
                        <Link href="/admin/products/new">
                            <Button leftIcon={<Plus className="w-5 h-5" />}>
                                Add Product
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <span className={`flex items-center text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
                            <Link href="/admin/orders" className="text-primary-600 text-sm font-medium hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {order.customer}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                ₹{order.total.toLocaleString('en-IN')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[order.status]}`}>
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
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Manage Products</p>
                                    <p className="text-sm text-gray-500">Add, edit, or remove products</p>
                                </div>
                            </Link>
                            <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">View Orders</p>
                                    <p className="text-sm text-gray-500">Manage customer orders</p>
                                </div>
                            </Link>
                            <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Customers</p>
                                    <p className="text-sm text-gray-500">View customer data</p>
                                </div>
                            </Link>
                        </div>

                        {/* Top Products */}
                        <h3 className="font-semibold text-gray-900 mt-6 mb-4">Top Products</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Chocolate Truffle Cake', sales: 156 },
                                { name: 'Red Velvet Delight', sales: 98 },
                                { name: 'Premium Gift Hamper', sales: 67 },
                            ].map((product, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{product.sales} sold</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
