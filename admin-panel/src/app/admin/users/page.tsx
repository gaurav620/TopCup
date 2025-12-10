'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Search, Plus, Edit2, Trash2, Shield, User as UserIcon,
    Mail, Phone, Calendar, X, Eye, EyeOff, Filter, RefreshCw
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'user' | 'admin';
    createdAt: string;
}

export default function AdminUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'user' as 'user' | 'admin'
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
            router.push('/');
            toast.error('Access denied');
        }
    }, [status, session, router]);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.role === 'admin') {
            fetchUsers();
        }
    }, [page, search, roleFilter, status, session]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                ...(search && { search }),
                ...(roleFilter && { role: roleFilter })
            });

            const res = await fetch(`/api/admin/users?${params}`);
            if (!res.ok) throw new Error('Failed to fetch users');

            const data = await res.json();
            setUsers(data.users);
            setTotal(data.total);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingUser
                ? `/api/admin/users/${editingUser._id}`
                : '/api/admin/users';

            const method = editingUser ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Operation failed');
            }

            toast.success(data.message);
            setShowModal(false);
            resetForm();
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message || 'Operation failed');
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Delete failed');
            }

            toast.success(data.message);
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message || 'Delete failed');
        }
    };

    const openCreateModal = () => {
        resetForm();
        setEditingUser(null);
        setShowModal(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            password: '',
            role: user.role
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'user'
        });
        setEditingUser(null);
    };

    if (status === 'loading' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Users className="w-7 h-7 text-primary-600" />
                                User Management
                            </h1>
                            <p className="text-gray-600 mt-1">Manage your team and customers</p>
                        </div>
                        <Button leftIcon={<Plus className="w-5 h-5" />} onClick={openCreateModal}>
                            Add New User
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="">All Roles</option>
                            <option value="user">Users</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{total}</p>
                                <p className="text-sm text-gray-600">Total Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(u => u.role === 'admin').length}
                                </p>
                                <p className="text-sm text-gray-600">Admins</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(u => u.role === 'user').length}
                                </p>
                                <p className="text-sm text-gray-600">Customers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p>No users found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">
                                                    {user.phone || 'Not provided'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                                        title="Edit user"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {total > 10 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {Math.min((page - 1) * 10 + 1, total)} to {Math.min(page * 10, total)} of {total} users
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * 10 >= total}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingUser ? 'Edit User' : 'Add New User'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    leftIcon={<UserIcon className="w-5 h-5" />}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    leftIcon={<Mail className="w-5 h-5" />}
                                    required
                                />
                                <Input
                                    label="Phone (Optional)"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    leftIcon={<Phone className="w-5 h-5" />}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password {editingUser && '(leave blank to keep current)'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            required={!editingUser}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        fullWidth
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" fullWidth>
                                        {editingUser ? 'Update User' : 'Create User'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
