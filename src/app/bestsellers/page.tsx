'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
import ProductCard, { Product } from '@/components/product/ProductCard';

const bestsellers: Product[] = [
    { _id: '1', name: 'Chocolate Truffle Cake', slug: 'chocolate-truffle-cake', price: 899, discountPrice: 749, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 156, isBestseller: true, weight: '1 kg' },
    { _id: '15', name: 'Coffee Mocha Cake', slug: 'coffee-mocha-cake', price: 949, discountPrice: 849, images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 123, isBestseller: true, weight: '1 kg' },
    { _id: '8', name: 'Luxury Chocolate Gift Set', slug: 'luxury-chocolate-gift-set', price: 1299, discountPrice: 999, images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=500'], category: 'gifts', averageRating: 4.8, totalReviews: 112, isBestseller: true },
    { _id: '18', name: 'Diwali Special Hamper', slug: 'diwali-special-hamper', price: 2499, discountPrice: 1999, images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 156, isBestseller: true },
    { _id: '4', name: 'Assorted Cookies Box', slug: 'assorted-cookies-box', price: 499, discountPrice: 399, images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 234, isBestseller: true, weight: '500g' },
    { _id: '22', name: 'Chocolate Truffle Box', slug: 'chocolate-truffle-box', price: 549, discountPrice: 449, images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 213, isBestseller: true, weight: '250g' },
    { _id: '25', name: 'Romantic Date Night', slug: 'romantic-date-night', price: 2299, discountPrice: 1899, images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 112, isBestseller: true },
    { _id: '2', name: 'Red Velvet Delight', slug: 'red-velvet-delight', price: 999, discountPrice: 849, images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 98, weight: '1 kg' },
];

export default function BestsellersPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'cakes', 'gifts', 'snacks', 'combos'];

    const filteredProducts = selectedCategory === 'all'
        ? bestsellers
        : bestsellers.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-cream-50">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
                <div className="container-custom text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h1 className="text-4xl font-bold mb-2">Bestsellers</h1>
                    <p className="text-white/80">Our most loved products by customers</p>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium capitalize transition-colors ${selectedCategory === cat
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {cat === 'all' ? 'All' : cat}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 mb-10 text-center">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="text-gray-600">Average rating <strong>4.7</strong></span>
                    </div>
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="text-gray-600">
                        <strong>{filteredProducts.length}</strong> products
                    </div>
                </div>

                {/* Products Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
