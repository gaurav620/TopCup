import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Contact Us | TopCup',
    description: 'Get in touch with TopCup for orders, support, or feedback.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
                    <p className="text-white/80">We&apos;re here to help you</p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-primary-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                    <p className="text-sm text-gray-500">Mon-Sat, 9am-8pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-primary-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">support@topcup.in</p>
                                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Address</h3>
                                    <p className="text-gray-600">123 Bakery Lane, MG Road</p>
                                    <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-primary-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                    <p className="text-gray-600">Monday - Saturday: 9am - 8pm</p>
                                    <p className="text-gray-600">Sunday: 10am - 6pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                                    <option>Order Inquiry</option>
                                    <option>Delivery Issue</option>
                                    <option>Feedback</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <Button fullWidth size="lg">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
