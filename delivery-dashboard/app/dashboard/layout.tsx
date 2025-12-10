'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home, Package, CheckCircle, BarChart3, User as UserIcon,
    LogOut, Menu, X, Bike
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Package, label: 'Active Orders', href: '/dashboard/orders' },
        { icon: CheckCircle, label: 'Completed', href: '/dashboard/history' },
        { icon: BarChart3, label: 'Statistics', href: '/dashboard/statistics' },
        { icon: UserIcon, label: 'Profile', href: '/dashboard/profile' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('deliveryAuth');
        localStorage.removeItem('deliveryPartner');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                            <Bike className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">Delivery Dashboard</h1>
                            <p className="text-xs text-gray-600">John Delivery</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col z-50">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                            <Bike className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">Delivery</h1>
                            <p className="text-sm text-gray-600">Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User & Logout */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">John Delivery</p>
                            <p className="text-xs text-gray-600">ID: DEL-001</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-white flex-col z-50"
                        >
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                                        <Bike className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-gray-900">Delivery</h1>
                                        <p className="text-sm text-gray-600">Dashboard</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="flex-1 p-4 space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="p-4 border-t border-gray-200">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
