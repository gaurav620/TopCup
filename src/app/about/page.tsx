import { Metadata } from 'next';
import Image from 'next/image';
import { Cake, Heart, Users, Award, Target, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us | TopCup',
    description: 'Learn about TopCup - Your destination for premium cakes, gifts, and celebration treats.',
};

const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Cities Served' },
    { number: '1000+', label: 'Products' },
    { number: '99%', label: 'Satisfaction Rate' },
];

const values = [
    {
        icon: Heart,
        title: 'Made with Love',
        description: 'Every product is crafted with passion and care by our skilled artisans.',
    },
    {
        icon: Award,
        title: 'Premium Quality',
        description: 'We use only the finest ingredients sourced from trusted suppliers.',
    },
    {
        icon: Users,
        title: 'Customer First',
        description: 'Your satisfaction is our top priority. We go the extra mile for you.',
    },
    {
        icon: Target,
        title: 'Fresh & On Time',
        description: 'Guaranteed fresh products delivered right when you need them.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
                <div className="container-custom text-center">
                    <Cake className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About TopCup</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Making every celebration sweeter since 2020
                    </p>
                </div>
            </div>

            {/* Story */}
            <div className="container-custom py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 rounded-full text-sm font-medium text-primary-600 mb-4">
                            <Sparkles className="w-4 h-4" />
                            Our Story
                        </span>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            From a Small Kitchen to Your Celebrations
                        </h2>
                        <p className="text-gray-600 mb-4">
                            TopCup started with a simple idea: everyone deserves access to premium quality cakes and
                            gifts without the hassle. What began as a small home bakery in Mumbai has grown into one
                            of India&apos;s most loved celebration destinations.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Today, we serve over 500 cities across India, delivering happiness right to your doorstep.
                            Our team of skilled bakers and gift curators work tirelessly to ensure every product meets
                            our high standards of quality and taste.
                        </p>
                        <p className="text-gray-600">
                            Whether it&apos;s a birthday, anniversary, festival, or just because - TopCup is here to make
                            your moments special.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=600"
                                alt="TopCup Bakery"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                            <p className="text-4xl font-bold text-primary-500">4+</p>
                            <p className="text-gray-600">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-900 py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
                                <p className="text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="container-custom py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        These core values guide everything we do at TopCup
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value) => (
                        <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                <value.icon className="w-7 h-7 text-primary-500" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-gray-600 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="container-custom pb-16">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Celebrate?</h2>
                    <p className="text-white/80 mb-6">Browse our collection and find the perfect treat for your occasion</p>
                    <a
                        href="/products"
                        className="inline-block bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
}
