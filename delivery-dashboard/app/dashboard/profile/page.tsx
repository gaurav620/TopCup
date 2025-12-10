'use client';

import { User as UserIcon, Mail, Phone, Bike, MapPin, Clock, Lock, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account settings</p>
            </div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white"
            >
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-4xl font-bold">
                        JD
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-1">John Delivery</h2>
                        <p className="text-white/80 mb-3">Delivery Partner ID: DEL-001</p>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                ⭐ 4.8 Rating
                            </span>
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                245 Deliveries
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all flex items-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>
                </div>
            </motion.div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-semibold text-gray-900">John Delivery</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">john.delivery@topcup.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Phone Number</p>
                            <p className="font-semibold text-gray-900">+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Area</p>
                            <p className="font-semibold text-gray-900">Gurgaon, Haryana</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Information</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Bike className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Vehicle Type</p>
                            <p className="font-semibold text-gray-900">Two Wheeler (Bike)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-600">🏍️</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Vehicle Number</p>
                            <p className="font-semibold text-gray-900">DL 01 AB 1234</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Working Hours</h3>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-600">Preferred Shift</p>
                        <p className="font-semibold text-gray-900">8:00 AM - 6:00 PM</p>
                    </div>
                    <div className="px-4 py-2 bg-green-100 rounded-xl">
                        <span className="font-semibold text-green-700">Active</span>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
                <button className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl w-full transition-all">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-600">Update your password</p>
                    </div>
                </button>
            </div>

            {/* Logout Button */}
            <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-4 rounded-xl font-semibold transition-all">
                Logout from Account
            </button>
        </div>
    );
}
