'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, Package, Heart, Tag, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotificationsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: true,
        newArrivals: false,
        priceDrops: true,
        emailNotifications: true,
    });

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/login?redirect=/account/notifications');
        return null;
    }

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationOptions = [
        { key: 'orderUpdates' as keyof typeof settings, icon: Package, title: 'Order Updates', description: 'Get notified about order status changes' },
        { key: 'promotions' as keyof typeof settings, icon: Tag, title: 'Promotions & Offers', description: 'Receive updates about sales and special offers' },
        { key: 'newArrivals' as keyof typeof settings, icon: Heart, title: 'New Arrivals', description: 'Stay updated on new products' },
        { key: 'priceDrops' as keyof typeof settings, icon: Tag, title: 'Price Drops', description: 'Get alerts when prices drop on wishlisted items' },
        { key: 'emailNotifications' as keyof typeof settings, icon: Mail, title: 'Email Notifications', description: 'Receive notifications via email' },
    ];

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Notification Preferences</h1>
                    <p className="text-gray-600 mt-1">Manage how you receive updates</p>
                </div>

                {/* Notification Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                >
                    <div className="space-y-6">
                        {notificationOptions.map((option, index) => (
                            <div key={option.key} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                        <option.icon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{option.title}</h3>
                                        <p className="text-sm text-gray-600">{option.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSetting(option.key)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[option.key] ? 'bg-primary-600' : 'bg-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[option.key] ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
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
