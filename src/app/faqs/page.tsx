'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        category: 'Orders',
        questions: [
            {
                q: 'How do I place an order?',
                a: 'Browse our products, add items to cart, and proceed to checkout. You can pay using UPI, Cards, or Cash on Delivery.',
            },
            {
                q: 'Can I modify my order after placing it?',
                a: 'Orders can be modified within 30 minutes of placing. Contact our support team immediately for any changes.',
            },
            {
                q: 'How can I track my order?',
                a: 'Once your order is shipped, you will receive a tracking link via SMS and email. You can also check order status in your account.',
            },
        ],
    },
    {
        category: 'Delivery',
        questions: [
            {
                q: 'What are the delivery charges?',
                a: 'Delivery is FREE on orders above ₹499. For orders below ₹499, a delivery charge of ₹49 applies.',
            },
            {
                q: 'Do you offer same-day delivery?',
                a: 'Yes! Same-day delivery is available for orders placed before 2 PM in select cities including Mumbai, Delhi, and Bangalore.',
            },
            {
                q: 'What if I am not available during delivery?',
                a: 'Our delivery partner will attempt to contact you. If unreachable, the order will be rescheduled for the next day.',
            },
        ],
    },
    {
        category: 'Payment',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery.',
            },
            {
                q: 'Is it safe to pay online?',
                a: 'Yes! All transactions are secured with 256-bit SSL encryption. We are PCI-DSS compliant and never store your card details.',
            },
            {
                q: 'Will I get a refund for cancelled orders?',
                a: 'Yes, refunds for prepaid orders are processed within 5-7 business days to your original payment method.',
            },
        ],
    },
    {
        category: 'Products',
        questions: [
            {
                q: 'Are your cakes eggless?',
                a: 'We offer both egg and eggless options. Each product page clearly mentions the variant. You can also filter by eggless cakes.',
            },
            {
                q: 'How long do cakes stay fresh?',
                a: 'Our cakes are best consumed within 24 hours if kept at room temperature, or 2-3 days if refrigerated.',
            },
            {
                q: 'Can I customize my order?',
                a: 'Yes! You can add custom messages on cakes. For special customizations, contact us at least 24 hours in advance.',
            },
        ],
    },
];

export default function FAQsPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
            q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(category => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
                    <p className="text-white/80">Find answers to common questions</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Search */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>

                    {/* FAQ Categories */}
                    {filteredFaqs.map((category) => (
                        <div key={category.category} className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-gray-900">{category.category}</h2>
                            <div className="space-y-3">
                                {category.questions.map((faq, idx) => {
                                    const key = `${category.category}-${idx}`;
                                    const isOpen = openIndex === key;
                                    return (
                                        <div key={key} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : key)}
                                                className="w-full flex items-center justify-between p-5 text-left"
                                            >
                                                <span className="font-medium text-gray-900">{faq.q}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                )}
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="px-5 pb-5 text-gray-600">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No FAQs found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
