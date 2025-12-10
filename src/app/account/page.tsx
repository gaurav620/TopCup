'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut,
    ChevronRight, Edit2, Check, X, ArrowRight, Shield, Bell
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function AccountPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: session?.user?.name || 'Demo User',
        email: session?.user?.email || 'demo@topcup.in',
        phone: '9876543210',
    });

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-cream-50 py-12">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center"
                    >
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="w-12 h-12 text-primary-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h1>
                        <p className="text-gray-600 mb-6">
                            Sign in to access your account
                        </p>
                        <Link href="/login?redirect=/account">
                            <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                                Sign In
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        setIsEditing(false);
        toast.success('Profile updated successfully!');
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
        toast.success('Logged out successfully');
    };

    const menuItems = [
        { icon: Package, label: 'My Orders', href: '/orders', description: 'View your order history' },
        { icon: Heart, label: 'Wishlist', href: '/wishlist', description: 'Your saved items' },
        { icon: MapPin, label: 'Addresses', href: '/account/addresses', description: 'Manage delivery addresses' },
        { icon: Bell, label: 'Notifications', href: '/account/notifications', description: 'Notification preferences' },
        { icon: Shield, label: 'Security', href: '/account/security', description: 'Password & security' },
    ];

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="md:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="p-2 rounded-xl hover:bg-green-100 text-green-600"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {(session?.user?.name || 'D')[0].toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {session?.user?.name || 'Demo User'}
                                    </h3>
                                    <p className="text-gray-500">Member since Dec 2024</p>
                                </div>
                            </div>

                            {/* Profile Fields */}
                            <div className="space-y-4">
                                {isEditing ? (
                                    <>
                                        <Input
                                            label="Full Name"
                                            value={profile.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, name: e.target.value })}
                                            leftIcon={<User className="w-5 h-5" />}
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, email: e.target.value })}
                                            leftIcon={<Mail className="w-5 h-5" />}
                                            disabled
                                        />
                                        <Input
                                            label="Phone"
                                            value={profile.phone}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, phone: e.target.value })}
                                            leftIcon={<Phone className="w-5 h-5" />}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Full Name</p>
                                                <p className="font-medium text-gray-900">{profile.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="font-medium text-gray-900">{profile.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Phone</p>
                                                <p className="font-medium text-gray-900">+91 {profile.phone}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-4 shadow-sm"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Quick Links</h2>
                            <div className="space-y-1">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-gray-500">{item.description}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Logout */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button
                                variant="outline"
                                fullWidth
                                leftIcon={<LogOut className="w-5 h-5" />}
                                onClick={handleLogout}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                                Sign Out
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
