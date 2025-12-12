'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderStatus, setOrderStatus] = useState<null | {
        number: string;
        status: string;
        cancelled: boolean;
        steps: { title: string; time: string; completed: boolean }[];
        cancellationMessage?: string;
    }>(null);

    const handleTrack = async () => {
        if (orderNumber.length < 6) {
            setError('Please enter a valid order number');
            return;
        }

        setLoading(true);
        setError('');
        setOrderStatus(null);

        try {
            const response = await fetch(`/api/track-order?orderNumber=${encodeURIComponent(orderNumber)}`);
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to track order');
                return;
            }

            if (data.success) {
                setOrderStatus(data.order);
            }
        } catch (err) {
            console.error('Error tracking order:', err);
            setError('Failed to track order. Please try again.');
        } finally {
            setLoading(false);
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
                                    onChange={(e) => {
                                        setOrderNumber(e.target.value);
                                        setError('');
                                    }}
                                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                            <Button
                                size="lg"
                                onClick={handleTrack}
                                disabled={loading}
                            >
                                {loading ? 'Tracking...' : 'Track'}
                            </Button>
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 mt-3">
                                {error}
                            </p>
                        )}
                        {!error && (
                            <p className="text-sm text-gray-500 mt-3">
                                Your order number can be found in the order confirmation email or SMS
                            </p>
                        )}
                    </div>

                    {/* Order Status */}
                    {orderStatus && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="text-xl font-bold text-gray-900">{orderStatus.number}</p>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${orderStatus.cancelled
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-green-100 text-green-700'
                                    }`}>
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

                            {/* Cancellation Message */}
                            {orderStatus.cancelled && orderStatus.cancellationMessage && (
                                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <p className="text-sm text-red-800">
                                        <strong>Note:</strong> {orderStatus.cancellationMessage}
                                    </p>
                                    <p className="text-sm text-red-700 mt-2">
                                        Need help? <a href="/contact" className="underline font-medium">Contact Support</a>
                                    </p>
                                </div>
                            )}
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
