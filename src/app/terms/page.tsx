import { Metadata } from 'next';
import { FileText, ShoppingBag, CreditCard, Truck, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms of Service | TopCup',
    description: 'Read the terms and conditions for using TopCup services.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                    <p className="text-white/80">Last updated: December 2024</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600">
                            By accessing and using TopCup&apos;s website and services, you accept and agree to be bound
                            by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingBag className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">2. Orders & Products</h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>All orders are subject to availability</li>
                            <li>Prices are in Indian Rupees (₹) and include applicable taxes</li>
                            <li>We reserve the right to refuse or cancel any order</li>
                            <li>Product images are for reference only; actual products may vary slightly</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">3. Payment</h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>We accept UPI, Credit/Debit Cards, and Cash on Delivery</li>
                            <li>Payment must be completed before order processing</li>
                            <li>All transactions are secured with SSL encryption</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Truck className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">4. Delivery</h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Delivery times are estimates and not guaranteed</li>
                            <li>Free delivery on orders above ₹499</li>
                            <li>Same-day delivery available in select cities</li>
                            <li>Customer must be available at the delivery address</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">5. Cancellation & Refunds</h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Orders can be cancelled within 2 hours of placing</li>
                            <li>Perishable items cannot be returned</li>
                            <li>Refunds are processed within 5-7 business days</li>
                            <li>Damaged products will be replaced or refunded</li>
                        </ul>
                    </section>

                    <section className="bg-cream-100 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <p className="text-gray-600">
                            For any questions about these terms, please email us at{' '}
                            <a href="mailto:legal@topcup.in" className="text-primary-500 hover:underline">
                                legal@topcup.in
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
