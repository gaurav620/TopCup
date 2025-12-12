'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, ArrowLeft, Package, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface OrderItem {
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    orderNumber: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
    totalPrice: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
}

export default function OrdersPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth !== 'true') {
            router.push('/');
        } else {
            setIsAuth(true);
            fetchOrders();
        }
    }, [router]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/orders');
            const data = await response.json();
            if (data.success) {
                const mappedOrders = data.orders.map((o: any) => ({
                    id: o._id,
                    orderNumber: o.orderNumber,
                    user: {
                        name: o.user?.name || 'Guest',
                        email: o.user?.email || 'N/A'
                    },
                    items: o.items.map((item: any) => ({
                        productName: item.productName || 'Unknown Product',
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalPrice: o.totalPrice,
                    status: o.status,
                    paymentMethod: o.paymentMethod || 'COD',
                    createdAt: o.createdAt
                }));
                setOrders(mappedOrders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: orderId, status: newStatus })
            });
            const data = await response.json();
            if (data.success) {
                await fetchOrders();
                alert('Order status updated successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order status');
        }
    };

    if (!isAuth || loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            order.user.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Smart revenue calculation - matches dashboard stats
    const calculateRevenue = () => {
        return orders.reduce((total, order) => {
            // Count revenue from confirmed, processing, shipped, and delivered orders
            if (['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status)) {
                return total + order.totalPrice;
            }
            return total;
        }, 0);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'confirmed': return 'bg-blue-100 text-blue-700';
            case 'processing': return 'bg-purple-100 text-purple-700';
            case 'shipped': return 'bg-indigo-100 text-indigo-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <ShoppingBag className="w-7 h-7 text-green-600" />
                                    Order Management
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">Process & track orders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filters */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by order number or customer..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all"
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Order Placed</option>
                            <option value="confirmed">Order Confirmed</option>
                            <option value="processing">Preparing</option>
                            <option value="shipped">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                            <ShoppingBag className="w-5 h-5 text-green-600" />
                            <p className="text-xs text-gray-600 font-medium">Total</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-yellow-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <p className="text-xs text-gray-600 font-medium">Order Placed</p>
                        </div>
                        <p className="text-2xl font-bold text-yellow-700">
                            {orders.filter(o => o.status === 'pending').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-blue-600" />
                            <p className="text-xs text-gray-600 font-medium">Confirmed</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-700">
                            {orders.filter(o => o.status === 'confirmed').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-purple-600" />
                            <p className="text-xs text-gray-600 font-medium">Preparing</p>
                        </div>
                        <p className="text-2xl font-bold text-purple-700">
                            {orders.filter(o => o.status === 'processing').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-indigo-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-indigo-600" />
                            <p className="text-xs text-gray-600 font-medium">Out for Delivery</p>
                        </div>
                        <p className="text-2xl font-bold text-indigo-700">
                            {orders.filter(o => o.status === 'shipped').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-green-600" />
                            <p className="text-xs text-gray-600 font-medium">Delivered</p>
                        </div>
                        <p className="text-2xl font-bold text-green-700">
                            {orders.filter(o => o.status === 'delivered').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-red-600" />
                            <p className="text-xs text-gray-600 font-medium">Cancelled</p>
                        </div>
                        <p className="text-2xl font-bold text-red-700">
                            {orders.filter(o => o.status === 'cancelled').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                            <p className="text-xs text-gray-600 font-medium">Revenue</p>
                        </div>
                        <p className="text-lg font-bold text-emerald-700">
                            ₹{calculateRevenue().toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Confirmed+</p>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order #</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-mono text-sm font-semibold text-indigo-600">
                                            {order.orderNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.user.name}</p>
                                                <p className="text-sm text-gray-500">{order.user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            ₹{order.totalPrice.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                                {order.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusColor(order.status)}`}
                                            >
                                                <option value="pending">Order Placed</option>
                                                <option value="confirmed">Order Confirmed</option>
                                                <option value="processing">Preparing</option>
                                                <option value="shipped">Out for Delivery</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
