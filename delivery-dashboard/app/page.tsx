'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bike, Lock, User, Eye, EyeOff, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeliveryLogin() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: identifier, password })
            });

            const data = await res.json();

            if (data.success) {
                // Store partner data
                localStorage.setItem('deliveryAuth', 'true');
                localStorage.setItem('deliveryPartner', JSON.stringify(data.data));
                localStorage.setItem('deliveryPartnerId', data.data._id);
                localStorage.setItem('deliveryPartnerName', data.data.name);
                router.push('/dashboard');
            } else {
                setError(data.error || 'Invalid credentials');
                setLoading(false);
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg mb-4"
                        >
                            <Bike className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                            Delivery Partner
                        </h1>
                        <p className="text-gray-600">TopCup Delivery Dashboard</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email or Phone
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                                    placeholder="Enter your email or phone"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                            >
                                <span className="flex-1">{error}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Sign In to Dashboard
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Credentials hint */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl">
                        <p className="text-sm font-semibold text-teal-900 mb-2">🔑 Demo Credentials:</p>
                        <div className="space-y-1">
                            <p className="text-sm text-teal-700">
                                Email: <code className="bg-white px-2 py-1 rounded font-mono text-teal-600 font-semibold">delivery</code>
                            </p>
                            <p className="text-sm text-teal-700">
                                Password: <code className="bg-white px-2 py-1 rounded font-mono text-teal-600 font-semibold">delivery123</code>
                            </p>
                        </div>
                    </div>

                    {/* Help text */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Need help?{' '}
                            <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-white/80 text-sm">
                    <p>TopCup Delivery Partner Dashboard • Secure Login</p>
                </div>
            </motion.div>
        </div>
    );
}
