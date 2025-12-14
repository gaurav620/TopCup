'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Gift, Sparkles, Star, Phone, ShoppingBag, Percent } from 'lucide-react';
import ProductCard, { Product } from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Snowfall from '@/components/christmas/Snowfall';
import ChristmasHero from '@/components/christmas/ChristmasHero';
import ProductSlider from '@/components/christmas/ProductSlider';
import { christmasProducts } from '@/data/christmasProducts';

// Regular featured products
const featuredProducts: Product[] = [
    {
        _id: '1',
        name: 'Chocolate Truffle Cake',
        slug: 'chocolate-truffle-cake',
        price: 700,
        discountPrice: 350,
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'],
        category: 'cakes',
        averageRating: 4.8,
        totalReviews: 156,
        isBestseller: true,
        weight: '500g',
    },
    {
        _id: '2',
        name: 'Red Velvet Delight',
        slug: 'red-velvet-delight',
        price: 900,
        discountPrice: 450,
        images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500'],
        category: 'cakes',
        averageRating: 4.7,
        totalReviews: 98,
        weight: '500g',
    },
    {
        _id: '3',
        name: 'Premium Gift Hamper',
        slug: 'premium-gift-hamper',
        price: 3000,
        discountPrice: 1500,
        images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500'],
        category: 'gifts',
        averageRating: 4.9,
        totalReviews: 67,
        isFeatured: true,
    },
    {
        _id: '4',
        name: 'Assorted Cookies Box',
        slug: 'assorted-cookies-box',
        price: 800,
        discountPrice: 400,
        images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'],
        category: 'snacks',
        averageRating: 4.6,
        totalReviews: 234,
        isBestseller: true,
        weight: '500g',
    },
];

const testimonials = [
    {
        name: 'Priya Sharma',
        location: 'Mumbai',
        rating: 5,
        text: 'The Christmas cake was absolutely divine! Delivered fresh and beautifully packaged. Perfect for our celebration!',
        avatar: 'P',
    },
    {
        name: 'Rahul Verma',
        location: 'Delhi',
        rating: 5,
        text: 'Ordered the Santa surprise box for my kids. They absolutely loved it! Amazing quality and presentation.',
        avatar: 'R',
    },
    {
        name: 'Ananya Patel',
        location: 'Bangalore',
        rating: 5,
        text: 'Best festive treats ever! The gingerbread house cake was a hit at our Christmas party. Highly recommend!',
        avatar: 'A',
    },
];

export default function HomePage() {
    const [sliderProducts, setSliderProducts] = useState(christmasProducts);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    // Fetch products from database
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products?featured=true&limit=8');
                if (response.ok) {
                    const data = await response.json();
                    if (data.products && data.products.length > 0) {
                        setSliderProducts(data.products);
                    }
                }
            } catch (error) {
                console.log('Using demo products:', error);
                // Keep using christmasProducts as fallback
            } finally {
                setIsLoadingProducts(false);
            }
        }

        fetchProducts();
    }, []);
    return (
        <div className="min-h-screen relative">
            {/* Snowfall Animation */}
            <Snowfall />

            {/* Christmas Hero */}
            <ChristmasHero />

            {/* Christmas Mega Sale Banner */}
            <section className="py-6 bg-gradient-to-r from-red-600 via-green-600 to-red-600 relative overflow-hidden animate-gradient-x">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                <div className="container-custom relative z-10">
                    <div className="flex items-center justify-center gap-4 text-white">
                        <Percent className="w-6 h-6 animate-pulse" />
                        <p className="text-lg md:text-xl font-bold">
                            🎄 CHRISTMAS MEGA SALE 🎄 | Up to 50% OFF + FREE Delivery Above ₹999!
                        </p>
                        <Percent className="w-6 h-6 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Christmas Special Slider */}
            <section className="py-12 bg-gradient-to-b from-cream-50 to-white">
                <div className="container-custom">
                    {isLoadingProducts ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            <p className="mt-4 text-gray-600">Loading amazing products...</p>
                        </div>
                    ) : (
                        <ProductSlider
                            products={sliderProducts}
                            title="🎅 Featured Products 🎄"
                        />
                    )}
                </div>
            </section>

            {/* Special Offers Grid */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            🎁 Exclusive Christmas Offers 🎁
                        </h2>
                        <p className="text-gray-600">Limited time festive deals you don&apos;t want to miss!</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-8 text-white hover-lift">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <Gift className="w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Free Gift Wrap</h3>
                                <p className="text-white/90 mb-4">Beautiful Christmas packaging on all orders</p>
                                <Link href="/products?category=gifts">
                                    <Button size="sm" className="bg-white text-red-600 hover:bg-gray-100">
                                        Shop Gifts
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-700 p-8 text-white hover-lift">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <Sparkles className="w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Bundle Deals</h3>
                                <p className="text-white/90 mb-4">Buy 2 Get 1 Free on selected combos</p>
                                <Link href="/products?category=combos">
                                    <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100">
                                        View Combos
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-8 text-white hover-lift">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <Phone className="w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                                <p className="text-white/90 mb-4">Order assistance anytime during holidays</p>
                                <Link href="/contact">
                                    <Button size="sm" className="bg-white text-amber-600 hover:bg-gray-100">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bestsellers */}
            <section className="py-16 bg-cream-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                                Bestsellers 🌟
                            </h2>
                            <p className="text-gray-600">Customer favorites all year round</p>
                        </div>
                        <Link href="/bestsellers">
                            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                View All
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            Happy Customers 💝
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            See what our customers are saying about their Christmas celebrations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-cream-50 to-white rounded-2xl p-6 border-2 border-primary-100 relative hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed italic">
                                    &quot;{testimonial.text}&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Christmas Theme */}
            <section className="py-16 bg-gradient-to-br from-red-600 via-green-600 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative z-10">
                    <div className="text-center text-white">
                        <div className="mb-6 text-6xl">🎄</div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                            Make This Christmas Memorable!
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Order now and get FREE delivery + special Christmas packaging on all orders
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/products">
                                <Button
                                    size="lg"
                                    className="bg-white text-red-600 hover:bg-gray-100 font-bold"
                                >
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Start Shopping
                                </Button>
                            </Link>
                            <Link href="/products?category=gifts">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white/10"
                                >
                                    <Gift className="w-5 h-5 mr-2" />
                                    Browse Gifts
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
