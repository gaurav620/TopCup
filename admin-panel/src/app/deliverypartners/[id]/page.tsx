'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Bike, Package, Star, TrendingUp, Edit, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function DeliveryPartnerDetails() {
    const params = useParams();
    const router = useRouter();
    const [partner, setPartner] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        fetchPartnerDetails();
    }, [params.id]);

    const fetchPartnerDetails = async () => {
        try {
            const res = await fetch(`/api/delivery-partners/${params.id}`);
            const data = await res.json();
            if (data.success) {
                setPartner(data.data);
                setFormData(data.data);
            }
        } catch (error) {
            console.error('Error fetching partner:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/delivery-partners/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setPartner(data.data);
                setIsEditing(false);
                alert('Partner updated successfully!');
            }
        } catch (error) {
            console.error('Error updating partner:', error);
            alert('Failed to update partner');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Partner Not Found</h2>
                    <p className="text-gray-600 mb-6">This delivery partner doesn't exist.</p>
                    <Link
                        href="/deliverypartners"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Partners
                    </Link>
                </div>
            </div>
        );
    }

    const stats = [
        { label: 'Total Deliveries', value: partner.totalDeliveries || 0, icon: Package, color: 'blue' },
        { label: 'Rating', value: partner.rating || 0, icon: Star, color: 'yellow' },
        { label: 'Success Rate', value: `${partner.successRate || 0}%`, icon: TrendingUp, color: 'green' },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/deliverypartners"
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Delivery Partner Details</h1>
                        <p className="text-gray-600 mt-1">View and manage partner information</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
                    >
                        <Edit className="w-5 h-5" />
                        Edit Partner
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                        >
                            <Save className="w-5 h-5" />
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setFormData(partner);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                        >
                            <X className="w-5 h-5" />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Partner Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                                {partner.name?.charAt(0)?.toUpperCase() || 'D'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{partner.name}</h2>
                                <p className="text-gray-600">Partner ID: {partner._id}</p>
                                <div className="mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${partner.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {partner.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <User className="w-5 h-5 text-gray-500" />
                                        {partner.name}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <Mail className="w-5 h-5 text-gray-500" />
                                        {partner.email}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <Phone className="w-5 h-5 text-gray-500" />
                                        {partner.phone}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.area || ''}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <MapPin className="w-5 h-5 text-gray-500" />
                                        {partner.area || 'Not specified'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Bike className="w-6 h-6 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Vehicle Type</p>
                                    <p className="font-semibold text-gray-900">{partner.vehicleType || 'Two Wheeler'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <span className="text-2xl">🏍️</span>
                                <div>
                                    <p className="text-sm text-gray-600">Vehicle Number</p>
                                    <p className="font-semibold text-gray-900">{partner.vehicleNumber || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                    {/* Stats Cards */}
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Status Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Status</h3>
                        {isEditing ? (
                            <select
                                value={formData.status || 'active'}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-lg font-medium"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        ) : (
                            <div className={`px-4 py-3 rounded-xl text-center font-semibold text-lg ${partner.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : partner.status === 'suspended'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}>
                                {partner.status === 'active' ? 'Active' : partner.status === 'suspended' ? 'Suspended' : 'Inactive'}
                            </div>
                        )}
                        {isEditing && (
                            <p className="text-sm text-gray-600 mt-2">
                                Click Save to update status
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
