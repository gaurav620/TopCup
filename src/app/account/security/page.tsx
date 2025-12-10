'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function SecurityPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/login?redirect=/account/security');
        return null;
    }

    const handleChangePassword = () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            toast.error('Please fill in all fields');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            toast.error('New passwords do not match');
            return;
        }
        toast.success('Password changed successfully');
        setPasswords({ current: '', new: '', confirm: '' });
    };

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your password and security preferences</p>
                </div>

                {/* Change Password */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-primary-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Current Password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                            leftIcon={<Key className="w-5 h-5" />}
                        />
                        <Input
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            leftIcon={<Lock className="w-5 h-5" />}
                        />
                        <Input
                            label="Confirm New Password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            leftIcon={<Lock className="w-5 h-5" />}
                        />

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                            />
                            <label htmlFor="showPassword" className="text-sm text-gray-600 cursor-pointer">
                                Show passwords
                            </label>
                        </div>

                        <Button fullWidth onClick={handleChangePassword}>
                            Update Password
                        </Button>
                    </div>
                </motion.div>

                {/* Security Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Account Security</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-600">Add extra security to your account</p>
                            </div>
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
                                Coming Soon
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900">Login Activity</p>
                                <p className="text-sm text-gray-600">View your recent login history</p>
                            </div>
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
                                Coming Soon
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Back to Account */}
                <div className="mt-8">
                    <Link href="/account">
                        <Button variant="ghost">
                            ← Back to Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
