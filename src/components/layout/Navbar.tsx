'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    Search,
    ChevronDown,
    LogOut,
    Package,
    Settings,
    Cake,
    Gift,
    Cookie,
    Sparkles,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const categories = [
    { name: 'Cakes', href: '/category/cakes', icon: Cake, color: 'text-pink-500' },
    { name: 'Gifts', href: '/category/gifts', icon: Gift, color: 'text-purple-500' },
    { name: 'Snacks', href: '/category/snacks', icon: Cookie, color: 'text-amber-500' },
    { name: 'Combos', href: '/category/combos', icon: Sparkles, color: 'text-primary-500' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();
    const cartItemsCount = useCartStore((state) => state.getTotalItems());

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    }, [pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-warm">
                                <Cake className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-display text-2xl font-bold gradient-text hidden sm:block">
                                TopCup
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-primary-50 ${pathname === category.href
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-gray-700 hover:text-primary-600'
                                        }`}
                                >
                                    <category.icon className={`w-4 h-4 ${category.color}`} />
                                    {category.name}
                                </Link>
                            ))}
                            <Link
                                href="/products"
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-primary-50 ${pathname === '/products'
                                    ? 'text-primary-600 bg-primary-50'
                                    : 'text-gray-700 hover:text-primary-600'
                                    }`}
                            >
                                All Products
                            </Link>
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Search */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5 text-gray-700" />
                            </button>

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="hidden sm:flex p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
                                aria-label="Wishlist"
                            >
                                <Heart className="w-5 h-5 text-gray-700" />
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
                                aria-label="Cart"
                            >
                                <ShoppingCart className="w-5 h-5 text-gray-700" />
                                {mounted && cartItemsCount > 0 && (
                                    <span
                                        className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-primary-500 text-white text-xs font-bold rounded-full"
                                    >
                                        {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu */}
                            {session ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-gray-500 hidden md:block transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="font-semibold text-gray-900">{session.user?.name}</p>
                                                    <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                                                </div>
                                                <Link
                                                    href="/account"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                >
                                                    <User className="w-4 h-4" />
                                                    My Account
                                                </Link>
                                                <Link
                                                    href="/orders"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                >
                                                    <Package className="w-4 h-4" />
                                                    My Orders
                                                </Link>
                                                {session.user?.role === 'admin' && (
                                                    <Link
                                                        href="/admin"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Settings className="w-4 h-4" />
                                                        Admin Panel
                                                    </Link>
                                                )}
                                                <hr className="my-2" />
                                                <button
                                                    onClick={() => signOut()}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-warm"
                                >
                                    <User className="w-4 h-4" />
                                    Login
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 text-gray-700" />
                                ) : (
                                    <Menu className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                        >
                            <div className="container-custom py-4 space-y-2">
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        href={category.href}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                    >
                                        <category.icon className={`w-5 h-5 ${category.color}`} />
                                        {category.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/products"
                                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                >
                                    All Products
                                </Link>
                                <Link
                                    href="/wishlist"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors sm:hidden"
                                >
                                    <Heart className="w-5 h-5" />
                                    Wishlist
                                </Link>
                                {!session && (
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors mt-4"
                                    >
                                        <User className="w-5 h-5" />
                                        Login / Sign Up
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Search Modal */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-2xl mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for cakes, gifts, snacks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-14 py-5 bg-white rounded-2xl text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for fixed navbar */}
            <div className="h-16 md:h-20" />
        </>
    );
}
