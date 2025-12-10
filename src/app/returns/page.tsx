import { Metadata } from 'next';
import { RotateCcw, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Return Policy | TopCup',
    description: 'Learn about TopCup return and refund policies.',
};

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <RotateCcw className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Return Policy</h1>
                    <p className="text-white/80">100% satisfaction guaranteed</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Important Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-amber-800 mb-1">Important Note</h3>
                            <p className="text-amber-700 text-sm">
                                Due to the perishable nature of our products, we cannot accept returns for cakes and food items
                                unless they are damaged or incorrect. Please inspect your order upon delivery.
                            </p>
                        </div>
                    </div>

                    {/* Eligible for Return */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <h2 className="text-2xl font-bold">Eligible for Return/Refund</h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Product delivered is damaged or spoiled</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Wrong product delivered (different from what was ordered)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Missing items from your order</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Non-food items (gift boxes, accessories) in original condition</span>
                            </li>
                        </ul>
                    </div>

                    {/* Not Eligible */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold">Not Eligible for Return</h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Change of mind after delivery</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Partially consumed products</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Products with customization (custom messages, etc.)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Complaints raised after 24 hours of delivery</span>
                            </li>
                        </ul>
                    </div>

                    {/* Refund Timeline */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold">Refund Timeline</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Refund Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">UPI (Google Pay, PhonePe)</td>
                                        <td className="py-3 px-4 text-gray-600">2-3 business days</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">Credit/Debit Card</td>
                                        <td className="py-3 px-4 text-gray-600">5-7 business days</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">Net Banking</td>
                                        <td className="py-3 px-4 text-gray-600">5-7 business days</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-gray-600">Cash on Delivery</td>
                                        <td className="py-3 px-4 text-gray-600">7-10 business days (via bank transfer)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
