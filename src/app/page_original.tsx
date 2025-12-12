import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Cake, Gift, Cookie, Sparkles, Star, Truck, Shield, Clock } from 'lucide-react';
import ProductCard, { Product } from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

// Sample products data (will be replaced with API data)
const featuredProducts: Product[] = [
    {
        _id: '1',
        name: 'Chocolate Truffle Cake',
        slug: 'chocolate-truffle-cake',
        price: 899,
        discountPrice: 749,
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'],
        category: 'cakes',
        averageRating: 4.8,
        totalReviews: 156,
        isBestseller: true,
        weight: '1 kg',
    },
    {
        _id: '2',
        name: 'Red Velvet Delight',
        slug: 'red-velvet-delight',
        price: 999,
        discountPrice: 849,
        images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500'],
        category: 'cakes',
        averageRating: 4.7,
        totalReviews: 98,
        weight: '1 kg',
    },
    {
        _id: '3',
        name: 'Premium Gift Hamper',
        slug: 'premium-gift-hamper',
        price: 1999,
        discountPrice: 1499,
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
        price: 499,
        discountPrice: 399,
        images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'],
        category: 'snacks',
        averageRating: 4.6,
        totalReviews: 234,
        isBestseller: true,
        weight: '500g',
    },
    {
        _id: '5',
        name: 'Black Forest Cake',
        slug: 'black-forest-cake',
        price: 799,
        images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500'],
        category: 'cakes',
        averageRating: 4.5,
        totalReviews: 89,
        weight: '1 kg',
    },
    {
        _id: '6',
        name: 'Birthday Celebration Box',
        slug: 'birthday-celebration-box',
        price: 2499,
        discountPrice: 1999,
        images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'],
        category: 'combos',
        averageRating: 4.9,
        totalReviews: 45,
        isFeatured: true,
    },
    {
        _id: '7',
        name: 'Gourmet Brownie Box',
        slug: 'gourmet-brownie-box',
        price: 599,
        discountPrice: 449,
        images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500'],
        category: 'snacks',
        averageRating: 4.7,
        totalReviews: 178,
        weight: '400g',
    },
    {
        _id: '8',
        name: 'Luxury Chocolate Gift Set',
        slug: 'luxury-chocolate-gift-set',
        price: 1299,
        discountPrice: 999,
        images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=500'],
        category: 'gifts',
        averageRating: 4.8,
        totalReviews: 112,
        isBestseller: true,
    },
];

const categories = [
    {
        name: 'Cakes',
        slug: 'cakes',
        icon: Cake,
        color: 'from-pink-400 to-rose-500',
        bgColor: 'bg-pink-50',
        count: 50,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    },
    {
        name: 'Gifts',
        slug: 'gifts',
        icon: Gift,
        color: 'from-purple-400 to-violet-500',
        bgColor: 'bg-purple-50',
        count: 35,
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
    },
    {
        name: 'Snacks',
        slug: 'snacks',
        icon: Cookie,
        color: 'from-amber-400 to-orange-500',
        bgColor: 'bg-amber-50',
        count: 40,
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    },
    {
        name: 'Combos',
        slug: 'combos',
        icon: Sparkles,
        color: 'from-primary-400 to-primary-600',
        bgColor: 'bg-primary-50',
        count: 25,
        image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400',
    },
];

const testimonials = [
    {
        name: 'Priya Sharma',
        location: 'Mumbai',
        rating: 5,
        text: 'The cake was absolutely delicious! Delivered fresh and on time. Best online bakery I\'ve ordered from.',
        avatar: 'P',
    },
    {
        name: 'Rahul Verma',
        location: 'Delhi',
        rating: 5,
        text: 'Ordered a gift hamper for my mom\'s birthday. She loved it! The packaging was premium quality.',
        avatar: 'R',
    },
    {
        name: 'Ananya Patel',
        location: 'Bangalore',
        rating: 5,
        text: 'Amazing variety of snacks. The cookies were crispy and fresh. Will definitely order again!',
        avatar: 'A',
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-cream-50 via-cream-100 to-primary-50 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary-500/10 blur-3xl" />
                    <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary-500/10 blur-3xl" />
                </div>

                <div className="container-custom relative py-12 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-600 mb-6 shadow-sm">
                                <Sparkles className="w-4 h-4" />
                                Free delivery on orders above ₹499
                            </span>

                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                                Delicious Cakes &
                                <span className="block gradient-text">Thoughtful Gifts</span>
                            </h1>

                            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                                Make every celebration special with our premium cakes, curated gift hampers,
                                and delicious snacks. Same-day delivery available across India!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/products">
                                    <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                        Shop Now
                                    </Button>
                                </Link>
                                <Link href="/category/cakes">
                                    <Button size="lg" variant="outline">
                                        Explore Cakes
                                    </Button>
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-center lg:justify-start gap-8 mt-10">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-gray-900">50k+</p>
                                    <p className="text-sm text-gray-500">Happy Customers</p>
                                </div>
                                <div className="w-px h-12 bg-gray-200" />
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-gray-900">4.9</p>
                                    <p className="text-sm text-gray-500">Average Rating</p>
                                </div>
                                <div className="w-px h-12 bg-gray-200" />
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-gray-900">100+</p>
                                    <p className="text-sm text-gray-500">Products</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Hero Image */}
                        <div className="relative hidden lg:block">
                            <div className="relative w-full aspect-square">
                                <Image
                                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
                                    alt="Delicious Cake"
                                    fill
                                    className="object-cover rounded-3xl shadow-2xl"
                                    priority
                                />
                                {/* Floating Cards */}
                                <div className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-lg animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                                            <Truck className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Free Delivery</p>
                                            <p className="text-xs text-gray-500">Same day available</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -right-8 bottom-1/4 bg-white rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">100% Fresh</p>
                                            <p className="text-xs text-gray-500">Quality guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our wide range of delicious cakes, thoughtful gifts, and tasty snacks
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/5] hover-lift"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 shadow-lg`}>
                                        <category.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                        {category.name}
                                    </h3>
                                    <p className="text-white/80 text-sm">{category.count}+ Products</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-cream-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                                Bestsellers
                            </h2>
                            <p className="text-gray-600">Our most loved products</p>
                        </div>
                        <Link href="/bestsellers">
                            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                View All
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {featuredProducts.slice(0, 8).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offer Banner */}
            <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative">
                    <div className="text-center text-white">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            <Clock className="w-4 h-4" />
                            Limited Time Offer
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                            Get 20% Off on Your First Order!
                        </h2>
                        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                            Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">WELCOME20</span> at checkout
                        </p>
                        <Link href="/products">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-white text-primary-600 hover:bg-gray-100"
                            >
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real reviews from our happy customers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-cream-50 rounded-2xl p-6 relative"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
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

            {/* Why Choose Us */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            Why Choose TopCup?
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We&apos;re committed to making your celebrations memorable
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Cake,
                                title: 'Freshly Made',
                                description: 'All products are made fresh daily with premium ingredients',
                            },
                            {
                                icon: Truck,
                                title: 'Fast Delivery',
                                description: 'Same-day delivery available in major cities',
                            },
                            {
                                icon: Shield,
                                title: 'Quality Assured',
                                description: '100% satisfaction guaranteed or your money back',
                            },
                            {
                                icon: Gift,
                                title: 'Special Packaging',
                                description: 'Beautiful gift packaging for all occasions',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/20 flex items-center justify-center">
                                    <feature.icon className="w-8 h-8 text-primary-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-cream-50">
                <div className="container-custom">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                        </div>
                        <div className="relative">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                                Ready to Make Someone Smile?
                            </h2>
                            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                                Browse our collection and find the perfect cake or gift for your loved ones
                            </p>
                            <Link href="/products">
                                <Button
                                    size="lg"
                                    className="bg-white text-primary-600 hover:bg-gray-100"
                                >
                                    Start Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
