// Example: Phone OTP Login Component
'use client';

import { useState } from 'react';
import { sendOTP, verifyOTP } from '@/lib/phoneAuth';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function PhoneLoginModal({ onClose, onSuccess }: {
    onClose: () => void;
    onSuccess: (user: any) => void;
}) {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        if (!phone || phone.length !== 10) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        try {
            const result = await sendOTP(phone);
            setConfirmationResult(result);
            setStep('otp');
            toast.success('OTP sent to your phone!');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const user = await verifyOTP(confirmationResult, otp);
            toast.success('Phone verified successfully!');

            // Send to backend to create/update user session
            const response = await fetch('/api/auth/phone-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: user.uid,
                    phone: user.phoneNumber,
                }),
            });

            const data = await response.json();
            onSuccess(data.user);
            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-6">
                    {step === 'phone' ? 'Login with Phone' : 'Verify OTP'}
                </h2>

                {step === 'phone' ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <div className="flex gap-2">
                                <span className="px-4 py-2 bg-gray-100 rounded-lg">+91</span>
                                <Input
                                    type="tel"
                                    placeholder="9876543210"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        {/* reCAPTCHA will be rendered here */}
                        <div id="recaptcha-container"></div>

                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                onClick={onClose}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSendOTP}
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Enter the 6-digit code sent to +91{phone}
                        </p>

                        <Input
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            value={otp}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="text-center text-2xl tracking-widest"
                        />

                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setStep('phone');
                                    setOtp('');
                                }}
                                className="flex-1"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleVerifyOTP}
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
