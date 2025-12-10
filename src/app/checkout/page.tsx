'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { MapPin, Phone, CreditCard, Truck, Wallet, Banknote, ChevronRight, Check, Shield, Lock, Smartphone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';


interface Address {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { items, getTotalPrice, getSubtotal, clearCart } = useCartStore();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
    const [address, setAddress] = useState<Address>({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
    });

    const subtotal = getSubtotal();
    const deliveryCharge = subtotal >= 499 ? 0 : 49;
    const total = subtotal + deliveryCharge;

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?redirect=/checkout');
        }
    }, [status, router]);

    useEffect(() => {
        if (items.length === 0) {
            router.push('/cart');
        }
    }, [items, router]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const validateAddress = () => {
        if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
            toast.error('Please fill in all required fields');
            return false;
        }
        if (!/^[6-9]\d{9}$/.test(address.phone)) {
            toast.error('Please enter a valid phone number');
            return false;
        }
        if (!/^\d{6}$/.test(address.pincode)) {
            toast.error('Please enter a valid 6-digit pincode');
            return false;
        }
        return true;
    };

    const handleProceedToPayment = () => {
        if (validateAddress()) {
            setStep(2);
        }
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        try {
            if (paymentMethod === 'online') {
                // Create Razorpay order
                const res = await fetch('/api/payment/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: total,
                        items,
                        address,
                    }),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.error);

                // Check if in demo mode
                if (data.demoMode) {
                    toast.success('Payment successful! (Demo Mode)');
                    clearCart();
                    router.push(`/order-confirmation?orderId=${data.orderId || 'demo'}`);
                    return;
                }

                // Load Razorpay script if not already loaded
                if (!(window as any).Razorpay) {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.async = true;
                    document.body.appendChild(script);
                    await new Promise((resolve) => {
                        script.onload = resolve;
                    });
                }

                // Configure Razorpay options
                const options: any = {
                    key: data.key, // Razorpay key from API
                    amount: data.amount, // Amount in paise
                    currency: data.currency,
                    name: 'TopCup',
                    description: 'Order Payment',
                    order_id: data.razorpayOrderId,
                    handler: async function (response: any) {
                        try {
                            // Verify payment
                            const verifyRes = await fetch('/api/payment/verify', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    orderId: data.orderId,
                                }),
                            });

                            const verifyData = await verifyRes.json();

                            if (!verifyRes.ok) throw new Error(verifyData.error);

                            toast.success('Payment successful!');
                            clearCart();
                            router.push(`/order-confirmation?orderId=${data.orderId}`);
                        } catch (error: any) {
                            toast.error(error.message || 'Payment verification failed');
                        }
                    },
                    prefill: {
                        name: address.fullName,
                        contact: address.phone,
                    },
                    theme: {
                        color: '#FF6B35',
                    },
                    modal: {
                        ondismiss: function () {
                            toast.error('Payment cancelled');
                            setIsProcessing(false);
                        },
                    },
                };

                // Don't set specific method - let user choose in Razorpay modal
                // Razorpay will show all payment options

                // Open Razorpay payment modal
                const razorpayInstance = new (window as any).Razorpay(options);
                razorpayInstance.open();

            } else if (paymentMethod === 'cod') {
                // Place COD order
                const res = await fetch('/api/payment/cod', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items,
                        address,
                        total,
                    }),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.error);

                toast.success('Order placed successfully!');
                clearCart();
                router.push(`/order-confirmation?orderId=${data.orderId || 'demo'}`);
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
            setIsProcessing(false);
        }
    };


    if (status === 'loading' || items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-50 py-8 md:py-12">
            <div className="container-custom">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'
                                }`}>
                                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                            </div>
                            <span className="font-medium hidden sm:block">Address</span>
                        </div>
                        <div className={`w-16 h-0.5 ${step > 1 ? 'bg-primary-500' : 'bg-gray-200'}`} />
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200'
                                }`}>
                                2
                            </div>
                            <span className="font-medium hidden sm:block">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    Delivery Address
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        name="fullName"
                                        placeholder="John Doe"
                                        value={address.fullName}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="flex items-center px-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600">
                                                +91
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="9876543210"
                                                value={address.phone}
                                                onChange={(e) =>
                                                    setAddress((prev) => ({
                                                        ...prev,
                                                        phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                                                    }))
                                                }
                                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Address Line 1"
                                            name="addressLine1"
                                            placeholder="House/Flat No., Building Name"
                                            value={address.addressLine1}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Address Line 2 (Optional)"
                                            name="addressLine2"
                                            placeholder="Street, Landmark"
                                            value={address.addressLine2}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <Input
                                        label="City"
                                        name="city"
                                        placeholder="Mumbai"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                    <Input
                                        label="State"
                                        name="state"
                                        placeholder="Maharashtra"
                                        value={address.state}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                    <Input
                                        label="Pincode"
                                        name="pincode"
                                        placeholder="400001"
                                        value={address.pincode}
                                        onChange={(e) =>
                                            setAddress((prev) => ({
                                                ...prev,
                                                pincode: e.target.value.replace(/\D/g, '').slice(0, 6),
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button
                                        size="lg"
                                        onClick={handleProceedToPayment}
                                        rightIcon={<ChevronRight className="w-5 h-5" />}
                                    >
                                        Continue to Payment
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary-500" />
                                    Payment Method
                                </h2>

                                {/* Payment Methods */}
                                <div className="space-y-4">
                                    {/* Online Payment */}
                                    <label
                                        className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'online'
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="online"
                                            checked={paymentMethod === 'online'}
                                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                                            className="mt-1 w-5 h-5 text-primary-600 focus:ring-primary-500"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <CreditCard className="w-6 h-6 text-primary-600" />
                                                <h3 className="font-bold text-gray-900 text-lg">Online Payment</h3>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Pay securely using Cards, UPI, Net Banking, or Wallets
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                                    💳 Cards
                                                </span>
                                                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                                    📱 UPI
                                                </span>
                                                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                                    🏦 Net Banking
                                                </span>
                                                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                                    💰 Wallets
                                                </span>
                                            </div>
                                            <p className="text-sm text-green-600 font-medium mt-2">
                                                ✓ 100% Secure • Instant confirmation
                                            </p>
                                        </div>
                                    </label>

                                    {/* Cash on Delivery */}
                                    <label
                                        className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod'
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                                            className="mt-1 w-5 h-5 text-primary-600 focus:ring-primary-500"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Truck className="w-6 h-6 text-amber-600" />
                                                <h3 className="font-bold text-gray-900 text-lg">Cash on Delivery</h3>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Pay when you receive your order at your doorstep
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <Button variant="ghost" onClick={() => setStep(1)}>
                                        ← Back to Address
                                    </Button>
                                    <Button
                                        size="lg"
                                        onClick={handlePlaceOrder}
                                        isLoading={isProcessing}
                                        rightIcon={<Lock className="w-4 h-4" />}
                                    >
                                        {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'} • ₹{total.toLocaleString('en-IN')}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                            {/* Items Preview */}
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                                            <Image
                                                src={item.image || '/images/placeholder.jpg'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                                            <p className="text-sm text-primary-600 font-semibold">
                                                ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Truck className="w-4 h-4" />
                                        Delivery
                                    </span>
                                    <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                                        {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                                    </span>
                                </div>
                                <div className="border-t border-gray-100 pt-2 mt-2">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address Preview (Step 2) */}
                            {step === 2 && address.fullName && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-semibold">{address.fullName}</p>
                                            <p className="text-gray-600">{address.addressLine1}</p>
                                            {address.addressLine2 && <p className="text-gray-600">{address.addressLine2}</p>}
                                            <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                                            <p className="text-gray-600">+91 {address.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Trust Badges */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        <span>Secure</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Lock className="w-4 h-4 text-green-500" />
                                        <span>Encrypted</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
