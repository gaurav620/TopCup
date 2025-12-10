'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Invalid credentials or not an admin');
            } else {
                toast.success('Signed in successfully!');
                router.push('/');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl shadow-lg mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
                    <p className="text-gray-600">Sign in to access TopCup admin dashboard</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            leftIcon={<Mail className="w-5 h-5" />}
                            required
                            placeholder="admin@topcup.in"
                        />

                        <div>
                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                leftIcon={<Lock className="w-5 h-5" />}
                                required
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Sign In to Admin Panel
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Only admin users can access this panel</p>
                        <p className="mt-2 text-xs text-gray-500">
                            Use your TopCup admin credentials
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
