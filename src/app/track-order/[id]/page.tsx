'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Package, Truck, CheckCircle, Clock, Phone, Mail, ArrowLeft, Navigation } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: Package },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'preparing', label: 'Preparing', icon: Clock },
    { key: 'ready', label: 'Ready', icon: Package },
    { key: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function TrackOrderPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/orders/${params.id}`);

                if (!res.ok) {
                    throw new Error('Order not found');
                }

                const data = await res.json();
                setOrder(data.order);
            } catch (err: any) {
                console.error('Error fetching order:', err);
                setError(err.message || 'Failed to load order');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchOrder();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-cream-50 py-12">
                <div className="container-custom max-w-2xl">
                    <div className="bg-white rounded-3xl p-8 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                        <p className="text-gray-600 mb-6">We couldn&apos;t find an order with this tracking ID. Please check the ID and try again.</p>
                        <Link href="/track-order">
                            <Button>View All Orders</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const currentStatusIndex = statusSteps.findIndex(step => step.key === order.status);

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom max-w-4xl">
                {/* Back Button */}
                <Link href="/orders" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Orders
                </Link>

                {/* Order Header */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
                            <p className="text-gray-600 mt-1">
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-primary-600">₹{order.totalPrice}</p>
                        </div>
                    </div>
                </div>

                {/* Map Section (if out for delivery) */}
                {order.status === 'out-for-delivery' && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Navigation className="w-5 h-5 text-primary-500" />
                            <h2 className="text-lg font-bold text-gray-900">Live Tracking</h2>
                        </div>
                        <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
                            {/* Placeholder for map - will integrate Google Maps */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                                    <p className="text-gray-600">Live tracking map</p>
                                    <p className="text-sm text-gray-500">Google Maps integration coming soon</p>
                                </div>
                            </div>
                        </div>
                        {order.deliveryPartnerName && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-medium text-gray-900">Delivery Partner</p>
                                <p className="text-gray-600">{order.deliveryPartnerName}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Order Status Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
                    <div className="relative">
                        {statusSteps.map((step, index) => {
                            const StepIcon = step.icon;
                            const isCompleted = index <= currentStatusIndex;
                            const isCurrent = index === currentStatusIndex;

                            return (
                                <div key={step.key} className="flex gap-4 pb-8 last:pb-0">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-gray-200 text-gray-400'
                                                }`}
                                        >
                                            <StepIcon className="w-5 h-5" />
                                        </div>
                                        {index < statusSteps.length - 1 && (
                                            <div
                                                className={`w-0.5 h-full mt-2 ${isCompleted ? 'bg-primary-500' : 'bg-gray-200'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-8">
                                        <p
                                            className={`font-semibold ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                                                }`}
                                        >
                                            {step.label}
                                        </p>
                                        {isCurrent && (
                                            <p className="text-sm text-gray-600 mt-1">Current status</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
                    <div className="space-y-4">
                        {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
                    </div>
                    <div className="text-gray-600">
                        <p className="font-semibold text-gray-900">{order.customer?.name || order.deliveryAddress?.fullAddress}</p>
                        <p>{order.deliveryAddress?.street}</p>
                        {order.deliveryAddress?.landmark && <p>{order.deliveryAddress.landmark}</p>}
                        <p>
                            {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.zipCode}
                        </p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{order.customer?.phone}</span>
                            </div>
                            {order.customer?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span>{order.customer.email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
