'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<null | {
        number: string;
        status: string;
        steps: { title: string; time: string; completed: boolean }[];
    }>(null);

    const handleTrack = () => {
        // Demo tracking - in production, this would call an API
        if (orderNumber.length >= 6) {
            setOrderStatus({
                number: orderNumber.toUpperCase(),
                status: 'Out for Delivery',
                steps: [
                    { title: 'Order Placed', time: 'Dec 7, 2024 10:30 AM', completed: true },
                    { title: 'Order Confirmed', time: 'Dec 7, 2024 10:35 AM', completed: true },
                    { title: 'Preparing', time: 'Dec 7, 2024 11:00 AM', completed: true },
                    { title: 'Out for Delivery', time: 'Dec 7, 2024 02:30 PM', completed: true },
                    { title: 'Delivered', time: 'Expected by 4:00 PM', completed: false },
                ],
            });
        }
    };

    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
                    <p className="text-white/80">Enter your order number to see delivery status</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Search Box */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter order number (e.g., TC2412ABC123)"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                            <Button size="lg" onClick={handleTrack}>
                                Track
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                            Your order number can be found in the order confirmation email or SMS
                        </p>
                    </div>

                    {/* Order Status */}
                    {orderStatus && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="text-xl font-bold text-gray-900">{orderStatus.number}</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                                    <Truck className="w-4 h-4" />
                                    <span className="font-medium">{orderStatus.status}</span>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-0">
                                {orderStatus.steps.map((step, index) => (
                                    <div key={step.title} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-200 text-gray-400'
                                                }`}>
                                                {step.completed ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <MapPin className="w-5 h-5" />
                                                )}
                                            </div>
                                            {index < orderStatus.steps.length - 1 && (
                                                <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                        </div>
                                        <div className="pb-8">
                                            <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'
                                                }`}>
                                                {step.title}
                                            </p>
                                            <p className="text-sm text-gray-500">{step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Help */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Having issues with your order?{' '}
                            <a href="/contact" className="text-primary-500 hover:underline font-medium">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
