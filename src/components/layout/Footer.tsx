import Link from 'next/link';
import {
    Cake,
    Gift,
    Cookie,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Truck,
    Shield,
    HeadphonesIcon,
} from 'lucide-react';

const footerLinks = {
    shop: [
        { name: 'All Products', href: '/products' },
        { name: 'Cakes', href: '/category/cakes' },
        { name: 'Gifts', href: '/category/gifts' },
        { name: 'Snacks', href: '/category/snacks' },
        { name: 'Combos', href: '/category/combos' },
        { name: 'Bestsellers', href: '/bestsellers' },
    ],
    support: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Return Policy', href: '/returns' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ],
};

const features = [
    { icon: Truck, title: 'Free Delivery', description: 'On orders above ₹499' },
    { icon: Shield, title: 'Secure Payments', description: 'UPI, Cards, COD' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'Always here to help' },
    { icon: CreditCard, title: 'Easy Returns', description: '100% refund policy' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Features Bar */}
            <div className="border-b border-gray-800">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                                    <p className="text-xs text-gray-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                                <Cake className="w-7 h-7 text-white" />
                            </div>
                            <span className="font-display text-3xl font-bold text-white">TopCup</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Premium cakes, thoughtful gifts, and delicious snacks delivered to your doorstep.
                            Making every celebration special since 2024.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                +91 98765 43210
                            </a>
                            <a
                                href="mailto:hello@topcup.in"
                                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                hello@topcup.in
                            </a>
                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>123 Sweet Lane, Bakery Street, Mumbai - 400001, India</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
                                aria-label="Youtube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">
                            © {currentYear} TopCup. All rights reserved. Made with ❤️ in India
                        </p>
                        <div className="flex items-center gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6 opacity-60 hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>We accept:</span>
                                <span>UPI</span>
                                <span>•</span>
                                <span>Cards</span>
                                <span>•</span>
                                <span>COD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
