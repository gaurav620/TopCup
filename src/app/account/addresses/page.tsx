'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Home, Building2, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AddressesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [addresses, setAddresses] = useState([
        {
            id: '1',
            type: 'home',
            fullName: 'Saurav Kumar',
            phone: '9876543210',
            addressLine1: 'Ward No. 15 Arraha, Supaul',
            city: 'Pratapgarh',
            state: 'Bihar',
            pincode: '854339',
            isDefault: true
        }
    ]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/login?redirect=/account/addresses');
        return null;
    }

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
        toast.success('Address deleted successfully');
    };

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
                            <p className="text-gray-600 mt-1">Manage your delivery addresses</p>
                        </div>
                        <Button leftIcon={<Plus className="w-5 h-5" />}>
                            Add New
                        </Button>
                    </div>
                </div>

                {/* Addresses List */}
                <div className="space-y-4">
                    {addresses.map((address, index) => (
                        <motion.div
                            key={address.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                            {address.type === 'home' ? (
                                                <Home className="w-5 h-5 text-primary-600" />
                                            ) : (
                                                <Building2 className="w-5 h-5 text-primary-600" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900 capitalize">
                                                    {address.type}
                                                </h3>
                                                {address.isDefault && (
                                                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">{address.fullName} • {address.phone}</p>
                                        </div>
                                    </div>

                                    <div className="ml-13 text-gray-700">
                                        <p>{address.addressLine1}</p>
                                        <p>{address.city}, {address.state} - {address.pincode}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600">
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="p-2 rounded-xl hover:bg-red-50 text-red-600"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
