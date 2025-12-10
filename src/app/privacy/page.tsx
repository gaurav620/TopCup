import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | TopCup',
    description: 'Learn how TopCup protects your personal information and privacy.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                    <p className="text-white/80">Last updated: December 2024</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">Information We Collect</h2>
                        </div>
                        <p className="text-gray-600 mb-4">We collect information you provide directly to us, including:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Name, email address, and phone number</li>
                            <li>Delivery address and billing information</li>
                            <li>Order history and preferences</li>
                            <li>Communications with our support team</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Process and deliver your orders</li>
                            <li>Send order confirmations and updates</li>
                            <li>Respond to your inquiries and requests</li>
                            <li>Improve our products and services</li>
                            <li>Send promotional offers (with your consent)</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">Data Security</h2>
                        </div>
                        <p className="text-gray-600">
                            We implement industry-standard security measures to protect your personal information.
                            All payment transactions are encrypted using SSL technology. We never store your
                            complete credit card details on our servers.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <p className="text-gray-600 mb-4">You have the right to:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section className="bg-cream-100 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-primary-500" />
                            <h2 className="text-xl font-bold">Questions?</h2>
                        </div>
                        <p className="text-gray-600">
                            If you have any questions about our privacy policy, please contact us at{' '}
                            <a href="mailto:privacy@topcup.in" className="text-primary-500 hover:underline">
                                privacy@topcup.in
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
