'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, ArrowRight, Eye, EyeOff, Cake, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type LoginMethod = 'email' | 'phone';

export default function LoginPage() {
    const router = useRouter();
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🔍 handleEmailLogin called', { email, password });
        setIsLoading(true);

        try {
            console.log('🔍 Calling signIn');
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                loginType: 'email',
            });

            console.log('🔍 signIn result:', result);

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success('Login successful!');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error('🔍 Login error:', error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };


    const handleSendOtp = async () => {
        if (!phone || phone.length !== 10) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        setOtpLoading(true);
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: phone, type: 'phone' }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setOtpSent(true);
            toast.success('OTP sent to your phone!');

            // In development, show OTP in toast
            if (data.devOtp) {
                toast(`Dev OTP: ${data.devOtp}`, { icon: '🔑', duration: 10000 });
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to send OTP');
        } finally {
            setOtpLoading(false);
        }
    };

    const handlePhoneLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                phone,
                otp,
                loginType: 'phone',
            });

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success('Login successful!');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-primary-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-warm">
                            <Cake className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-display text-3xl font-bold gradient-text">TopCup</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 mt-6">Welcome back!</h1>
                    <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
                </div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8"
                >
                    {/* Login Method Tabs */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <button
                            onClick={() => {
                                setLoginMethod('email');
                                setOtpSent(false);
                            }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'email'
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Email & Password
                        </button>
                        <button
                            onClick={() => setLoginMethod('phone')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'phone'
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Phone & OTP
                        </button>
                    </div>

                    {/* Login form tabs - CSS transitions for smooth switching */}
                    {loginMethod === 'email' ? (
                        <div className="transition-all duration-300">
                            <form
                                onSubmit={handleEmailLogin}
                                className="space-y-4"
                            >
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    leftIcon={<Mail className="w-5 h-5" />}
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    leftIcon={<Lock className="w-5 h-5" />}
                                    showPasswordToggle
                                    required
                                />
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <Link href="/forgot-password" className="text-primary-600 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="transition-all duration-300">
                            <form
                                onSubmit={handlePhoneLogin}
                                className="space-y-4"
                            >
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center px-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="9876543210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {otpSent ? (
                                    <>
                                        <Input
                                            label="Enter OTP"
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            maxLength={6}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            className="text-sm text-primary-600 hover:underline"
                                            disabled={otpLoading}
                                        >
                                            Resend OTP
                                        </button>
                                    </>
                                ) : (
                                    <Button
                                        type="button"
                                        fullWidth
                                        size="lg"
                                        variant="outline"
                                        onClick={handleSendOtp}
                                        isLoading={otpLoading}
                                    >
                                        Send OTP
                                    </Button>
                                )}

                                {otpSent && (
                                    <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                                        Verify & Sign In
                                    </Button>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-primary-600 font-semibold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </motion.div>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    By signing in, you agree to our{' '}
                    <Link href="/terms" className="text-primary-600 hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary-600 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
