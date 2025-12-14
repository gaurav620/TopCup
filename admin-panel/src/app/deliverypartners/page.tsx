'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, User, Phone, Bike, TrendingUp, ChevronLeft } from 'lucide-react';

interface DeliveryPartner {
    _id: string;
    name: string;
    email: string;
    phone: string;
    partnerId: string;
    vehicleType: string;
    vehicleNumber: string;
    status: string;
    totalDeliveries: number;
    rating: number;
    totalEarnings: number;
}

export default function DeliveryPartners() {
    const router = useRouter();
    const [partners, setPartners] = useState<DeliveryPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth !== 'true') {
            router.push('/');
            return;
        }
        fetchPartners();
    }, [filter, router]);

    const fetchPartners = async () => {
        try {
            const url = filter === 'all'
                ? '/api/delivery-partners'
                : `/api/delivery-partners?status=${filter}`;

            const res = await fetch(url);
            const data = await res.json();
            if (data.success) {
                setPartners(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this delivery partner?')) return;

        try {
            const res = await fetch(`/api/delivery-partners/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchPartners();
            }
        } catch (error) {
            console.error('Error deleting partner:', error);
        }
    };

    const filteredPartners = partners.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Delivery Partners</h1>
                            <p className="text-gray-600 mt-1">Manage your delivery team</p>
                        </div>
                        <Link href="/deliverypartners/add">
                            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all">
                                <Plus className="w-5 h-5" />
                                Add New Partner
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex gap-2">
                            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                All
                            </button>
                            <button onClick={() => setFilter('active')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'active' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                Active
                            </button>
                            <button onClick={() => setFilter('inactive')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'inactive' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                Inactive
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search partners..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Partners List */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                    </div>
                ) : filteredPartners.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <Bike className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No delivery partners found</h3>
                        <p className="text-gray-600 mb-4">Get started by adding your first delivery partner</p>
                        <Link href="/deliverypartners/add">
                            <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                                Add Partner
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredPartners.map((partner) => (
                            <div key={partner._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                            {partner.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
                                            <p className="text-sm text-gray-600">{partner.partnerId}</p>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" /> {partner.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" /> {partner.phone}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Bike className="w-4 h-4" /> {partner.vehicleType} - {partner.vehicleNumber}
                                                </span>
                                            </div>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-sm text-gray-600">
                                                    <TrendingUp className="w-4 h-4 inline mr-1" />
                                                    {partner.totalDeliveries} deliveries
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    ⭐ {partner.rating.toFixed(1)} rating
                                                </span>
                                                <span className="text-sm font-semibold text-green-600">
                                                    ₹{partner.totalEarnings}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${partner.status === 'active' ? 'bg-green-100 text-green-700' :
                                            partner.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {partner.status}
                                        </span>
                                        <Link href={`/deliverypartners/${partner._id}`}>
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(partner._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
