'use client';

import { User as UserIcon, Mail, Phone, MapPin, Lock, Edit2, LogOut, Save, X, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [passwordData, setPasswordData] = useState({ old: '', new: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const partnerData = localStorage.getItem('deliveryPartner');
        if (partnerData) {
            const data = JSON.parse(partnerData);
            setUserData(data);
            setFormData(data);
        } else {
            setUserData({
                name: 'Sneha',
                email: 'snehashaw1525@gmail.com',
                phone: '+91 98765 43210',
                area: 'Gurgaon'
            });
            setFormData({
                name: 'Sneha',
                email: 'snehashaw1525@gmail.com',
                phone: '+91 98765 43210',
                area: 'Gurgaon'
            });
        }
    }, []);

    const showMessage = (msg: string, type: 'success' | 'error') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleSave = () => {
        const updatedData = { ...userData, ...formData };
        localStorage.setItem('deliveryPartner', JSON.stringify(updatedData));
        setUserData(updatedData);
        setIsEditing(false);
        showMessage('✓ Saved Successfully!', 'success');
    };

    const handlePasswordChange = () => {
        if (passwordData.new.length < 6) {
            showMessage('Password must be at least 6 letters', 'error');
            return;
        }
        showMessage('✓ Password Changed!', 'success');
        setShowPasswordSection(false);
        setPasswordData({ old: '', new: '' });
    };

    const handleLogout = () => {
        if (confirm('Want to Logout?')) {
            localStorage.clear();
            router.push('/');
        }
    };

    if (!userData) return null;

    const initial = userData?.name?.charAt(0)?.toUpperCase() || 'D';

    return (
        <div className="p-4 space-y-4">
            {/* Message */}
            {message && (
                <div className={`p-4 rounded-2xl text-center text-lg font-bold ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {message}
                </div>
            )}

            {/* Profile Header - Big and Simple */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-6 text-white text-center shadow-lg">
                <div className="w-24 h-24 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-bold">
                    {initial}
                </div>
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-xl text-white/90">Delivery Partner</p>
            </div>

            {/* My Details - Simple Card */}
            <div className="bg-white rounded-3xl p-5 shadow">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">My Details</h2>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-teal-600 text-white px-6 py-3 rounded-2xl text-lg font-bold flex items-center gap-2"
                        >
                            <Edit2 className="w-6 h-6" />
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-6 py-3 rounded-2xl text-lg font-bold flex items-center gap-2"
                            >
                                <Save className="w-6 h-6" />
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData(userData);
                                }}
                                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl text-lg font-bold"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <UserIcon className="w-6 h-6 text-gray-500" />
                            <label className="text-lg font-semibold text-gray-700">Name</label>
                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-4 text-xl border-3 border-gray-300 rounded-2xl focus:border-teal-500 focus:outline-none"
                                placeholder="Enter your name"
                            />
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-2xl text-xl font-medium">{userData.name}</div>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Phone className="w-6 h-6 text-gray-500" />
                            <label className="text-lg font-semibold text-gray-700">Phone Number</label>
                        </div>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-4 text-xl border-3 border-gray-300 rounded-2xl focus:border-teal-500 focus:outline-none"
                                placeholder="Enter phone number"
                            />
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-2xl text-xl font-medium">{userData.phone}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-6 h-6 text-gray-500" />
                            <label className="text-lg font-semibold text-gray-700">Email</label>
                        </div>
                        {isEditing ? (
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-4 text-xl border-3 border-gray-300 rounded-2xl focus:border-teal-500 focus:outline-none"
                                placeholder="Enter email"
                            />
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-2xl text-xl font-medium">{userData.email}</div>
                        )}
                    </div>

                    {/* Area */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-6 h-6 text-gray-500" />
                            <label className="text-lg font-semibold text-gray-700">Work Area</label>
                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                className="w-full p-4 text-xl border-3 border-gray-300 rounded-2xl focus:border-teal-500 focus:outline-none"
                                placeholder="Enter your area"
                            />
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-2xl text-xl font-medium">{userData.area}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Change Password - Simple */}
            <div className="bg-white rounded-3xl p-5 shadow">
                <h2 className="text-2xl font-bold mb-4">Password</h2>

                {!showPasswordSection ? (
                    <button
                        onClick={() => setShowPasswordSection(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3"
                    >
                        <Lock className="w-7 h-7" />
                        Change Password
                    </button>
                ) : (
                    <div className="space-y-4">
                        {/* Old Password */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Old Password</label>
                            <div className="relative">
                                <input
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={passwordData.old}
                                    onChange={(e) => setPasswordData({ ...passwordData, old: e.target.value })}
                                    className="w-full p-4 pr-14 text-xl border-3 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none"
                                    placeholder="Enter old password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showOldPassword ? <EyeOff className="w-7 h-7 text-gray-500" /> : <Eye className="w-7 h-7 text-gray-500" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    className="w-full p-4 pr-14 text-xl border-3 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none"
                                    placeholder="Enter new password (min 6 letters)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showNewPassword ? <EyeOff className="w-7 h-7 text-gray-500" /> : <Eye className="w-7 h-7 text-gray-500" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handlePasswordChange}
                                className="flex-1 bg-green-600 text-white p-4 rounded-2xl text-xl font-bold"
                            >
                                Save Password
                            </button>
                            <button
                                onClick={() => {
                                    setShowPasswordSection(false);
                                    setPasswordData({ old: '', new: '' });
                                }}
                                className="px-6 bg-gray-300 text-gray-700 p-4 rounded-2xl text-xl font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Logout Button - Big and Clear */}
            <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white p-6 rounded-3xl text-2xl font-bold flex items-center justify-center gap-3 shadow-lg"
            >
                <LogOut className="w-8 h-8" />
                Logout
            </button>
        </div>
    );
}
