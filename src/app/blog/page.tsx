import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog | TopCup',
    description: 'Tips, recipes, and inspiration from TopCup.',
};

const blogPosts = [
    {
        title: '10 Trending Cake Designs for 2024',
        excerpt: 'From minimalist drip cakes to elaborate floral designs, discover the hottest cake trends...',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
        category: 'Trends',
        date: 'Dec 5, 2024',
        readTime: '5 min read',
        slug: 'trending-cake-designs-2024',
    },
    {
        title: 'How to Choose the Perfect Gift Hamper',
        excerpt: 'Not sure what to gift? Our guide helps you pick the ideal hamper for any occasion...',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
        category: 'Guides',
        date: 'Dec 3, 2024',
        readTime: '4 min read',
        slug: 'choose-perfect-gift-hamper',
    },
    {
        title: 'The Art of Cake Decoration: Beginner Tips',
        excerpt: 'Learn the basics of cake decoration with these easy-to-follow tips from our pastry chefs...',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600',
        category: 'Tips',
        date: 'Nov 28, 2024',
        readTime: '6 min read',
        slug: 'cake-decoration-tips',
    },
    {
        title: 'Healthy Snacking: Our Top Guilt-Free Picks',
        excerpt: 'Discover our range of healthy snacks that taste great without the guilt...',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
        category: 'Health',
        date: 'Nov 25, 2024',
        readTime: '3 min read',
        slug: 'healthy-snacking',
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Blog</h1>
                    <p className="text-white/80">Tips, recipes, and inspiration</p>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Featured Post */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
                    <div className="grid md:grid-cols-2">
                        <div className="relative aspect-video md:aspect-auto">
                            <Image
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                            <span className="text-sm text-primary-500 font-medium mb-2">{blogPosts[0].category}</span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
                            <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {blogPosts[0].date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {blogPosts[0].readTime}
                                </span>
                            </div>
                            <Link
                                href={`/blog/${blogPosts[0].slug}`}
                                className="inline-flex items-center gap-2 text-primary-500 font-medium hover:underline"
                            >
                                Read More <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.slice(1).map((post) => (
                        <article key={post.slug} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative aspect-video">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-600">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{post.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="mt-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
                    <p className="text-white/80 mb-6">Get the latest recipes, tips, and offers in your inbox</p>
                    <div className="flex max-w-md mx-auto gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
