'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users as UsersIcon, Plus, Search, Edit2, Trash2, Mail, Shield, User, ArrowLeft, X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
}

export default function UsersPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'user' as 'user' | 'admin', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth !== 'true') {
            router.push('/');
        } else {
            setIsAuth(true);
            fetchUsers();
        }
    }, [router]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/users');
            const data = await response.json();
            if (data.success) {
                const mappedUsers = data.users.map((u: any) => ({
                    id: u._id,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    createdAt: u.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0]
                }));
                setUsers(mappedUsers);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuth || loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddUser = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'user', password: '' });
        setShowModal(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
        setShowModal(true);
    };

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to delete this user? This will remove them from the database permanently.')) {
            try {
                const response = await fetch(`/api/users?id=${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (data.success) {
                    await fetchUsers();
                    alert('User deleted successfully!');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                const response = await fetch('/api/users', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: editingUser.id,
                        ...formData
                    })
                });
                const data = await response.json();
                if (data.success) {
                    await fetchUsers();
                    setShowModal(false);
                    alert('User updated successfully!');
                } else {
                    alert('Error: ' + data.error);
                }
            } else {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.success) {
                    await fetchUsers();
                    setShowModal(false);
                    alert('User created successfully!');
                } else {
                    alert('Error: ' + data.error);
                }
            }
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Failed to save user');
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
                                    <UsersIcon className="w-7 h-7 text-purple-600" />
                                    User Management
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">Manage customers and team members</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddUser}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Add User
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Stats */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-100">
                        <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                        <p className="text-sm text-gray-600">Total Users</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-indigo-100">
                        <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
                        <p className="text-sm text-gray-600">Admins</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
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
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingUser ? 'Edit User' : 'Add New User'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {!editingUser && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                                                placeholder="Enter password"
                                                required={!editingUser}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                                    >
                                        {editingUser ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
