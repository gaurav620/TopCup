'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, User, Cake, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success('Account created successfully!');

            // Auto login after signup
            const signInResult = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
                loginType: 'email',
            });

            if (signInResult?.ok) {
                router.push('/');
                router.refresh();
            } else {
                router.push('/login');
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: '' };

        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
        const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];

        return { strength, label: labels[strength], color: colors[strength] };
    };

    const ps = passwordStrength();

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
                    <h1 className="text-2xl font-bold text-gray-900 mt-6">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join us and start ordering</p>
                </div>

                {/* Signup Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            leftIcon={<User className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            leftIcon={<Mail className="w-5 h-5" />}
                            required
                        />

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number <span className="text-gray-400">(Optional)</span>
                            </label>
                            <div className="flex gap-2">
                                <div className="flex items-center px-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600">
                                    +91
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                                        }))
                                    }
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                leftIcon={<Lock className="w-5 h-5" />}
                                showPasswordToggle
                                required
                            />
                            {formData.password && (
                                <div className="space-y-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded ${i <= ps.strength ? ps.color : 'bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">{ps.label}</p>
                                </div>
                            )}
                        </div>

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            leftIcon={<Lock className="w-5 h-5" />}
                            showPasswordToggle
                            required
                        />

                        {/* Password Match Indicator */}
                        {formData.confirmPassword && (
                            <div className={`flex items-center gap-2 text-sm ${formData.password === formData.confirmPassword
                                    ? 'text-green-600'
                                    : 'text-red-500'
                                }`}>
                                {formData.password === formData.confirmPassword ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Passwords match
                                    </>
                                ) : (
                                    <span>Passwords do not match</span>
                                )}
                            </div>
                        )}

                        <div className="flex items-start gap-2 text-sm">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                required
                            />
                            <label htmlFor="terms" className="text-gray-600">
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary-600 hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary-600 hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                            Create Account
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </motion.div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    {[
                        { icon: '🎂', text: 'Fresh Products' },
                        { icon: '🚚', text: 'Fast Delivery' },
                        { icon: '💳', text: 'Secure Payment' },
                    ].map((feature, index) => (
                        <div key={index} className="text-sm text-gray-600">
                            <span className="text-2xl block mb-1">{feature.icon}</span>
                            {feature.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
