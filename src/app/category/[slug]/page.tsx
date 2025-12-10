'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard, { Product } from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

// All products data
const allProducts: Product[] = [
    // CAKES
    { _id: '1', name: 'Chocolate Truffle Cake', slug: 'chocolate-truffle-cake', price: 899, discountPrice: 749, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 156, isBestseller: true, weight: '1 kg' },
    { _id: '2', name: 'Red Velvet Delight', slug: 'red-velvet-delight', price: 999, discountPrice: 849, images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 98, weight: '1 kg' },
    { _id: '5', name: 'Black Forest Cake', slug: 'black-forest-cake', price: 799, images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500'], category: 'cakes', averageRating: 4.5, totalReviews: 89, weight: '1 kg' },
    { _id: '9', name: 'Vanilla Strawberry Cake', slug: 'vanilla-strawberry-cake', price: 849, images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'], category: 'cakes', averageRating: 4.6, totalReviews: 76, weight: '1 kg' },
    { _id: '12', name: 'Pineapple Fresh Cake', slug: 'pineapple-fresh-cake', price: 749, images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500'], category: 'cakes', averageRating: 4.5, totalReviews: 67, weight: '1 kg' },
    { _id: '13', name: 'Butterscotch Crunch Cake', slug: 'butterscotch-crunch-cake', price: 799, discountPrice: 699, images: ['https://images.unsplash.com/photo-1562440499-64c9a111f713?w=500'], category: 'cakes', averageRating: 4.6, totalReviews: 82, weight: '1 kg' },
    { _id: '14', name: 'Mango Delight Cake', slug: 'mango-delight-cake', price: 899, images: ['https://images.unsplash.com/photo-1519869325930-281384150729?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 54, weight: '1 kg' },
    { _id: '15', name: 'Coffee Mocha Cake', slug: 'coffee-mocha-cake', price: 949, discountPrice: 849, images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 123, isBestseller: true, weight: '1 kg' },

    // GIFTS
    { _id: '3', name: 'Premium Gift Hamper', slug: 'premium-gift-hamper', price: 1999, discountPrice: 1499, images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 67, isFeatured: true },
    { _id: '8', name: 'Luxury Chocolate Gift Set', slug: 'luxury-chocolate-gift-set', price: 1299, discountPrice: 999, images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=500'], category: 'gifts', averageRating: 4.8, totalReviews: 112, isBestseller: true },
    { _id: '10', name: 'Anniversary Gift Basket', slug: 'anniversary-gift-basket', price: 2999, discountPrice: 2499, images: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 54, isFeatured: true },
    { _id: '16', name: 'Birthday Surprise Box', slug: 'birthday-surprise-box', price: 1599, discountPrice: 1299, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'], category: 'gifts', averageRating: 4.7, totalReviews: 89 },
    { _id: '17', name: 'Thank You Gift Pack', slug: 'thank-you-gift-pack', price: 999, discountPrice: 799, images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'], category: 'gifts', averageRating: 4.6, totalReviews: 45 },
    { _id: '18', name: 'Diwali Special Hamper', slug: 'diwali-special-hamper', price: 2499, discountPrice: 1999, images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 156, isBestseller: true },

    // SNACKS
    { _id: '4', name: 'Assorted Cookies Box', slug: 'assorted-cookies-box', price: 499, discountPrice: 399, images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 234, isBestseller: true, weight: '500g' },
    { _id: '7', name: 'Gourmet Brownie Box', slug: 'gourmet-brownie-box', price: 599, discountPrice: 449, images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 178, weight: '400g' },
    { _id: '11', name: 'Dry Fruits Premium Box', slug: 'dry-fruits-premium-box', price: 899, discountPrice: 799, images: ['https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 132, weight: '500g' },
    { _id: '19', name: 'Chocolate Chip Cookies', slug: 'chocolate-chip-cookies', price: 349, discountPrice: 299, images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'], category: 'snacks', averageRating: 4.5, totalReviews: 198, weight: '300g' },
    { _id: '20', name: 'Almond Biscotti Pack', slug: 'almond-biscotti-pack', price: 449, images: ['https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 87, weight: '250g' },
    { _id: '21', name: 'Mixed Nuts Jar', slug: 'mixed-nuts-jar', price: 699, discountPrice: 599, images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500'], category: 'snacks', averageRating: 4.8, totalReviews: 165, weight: '500g' },
    { _id: '22', name: 'Chocolate Truffle Box', slug: 'chocolate-truffle-box', price: 549, discountPrice: 449, images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 213, isBestseller: true, weight: '250g' },

    // COMBOS
    { _id: '6', name: 'Birthday Celebration Box', slug: 'birthday-celebration-box', price: 2499, discountPrice: 1999, images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 45, isFeatured: true },
    { _id: '23', name: 'Party Pack Combo', slug: 'party-pack-combo', price: 3499, discountPrice: 2999, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'], category: 'combos', averageRating: 4.8, totalReviews: 67 },
    { _id: '24', name: 'Family Treat Combo', slug: 'family-treat-combo', price: 1999, discountPrice: 1699, images: ['https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500'], category: 'combos', averageRating: 4.7, totalReviews: 89 },
    { _id: '25', name: 'Romantic Date Night', slug: 'romantic-date-night', price: 2299, discountPrice: 1899, images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 112, isBestseller: true },
];

const categoryInfo: Record<string, { title: string; description: string }> = {
    cakes: { title: 'Delicious Cakes', description: 'Freshly baked cakes for every celebration' },
    gifts: { title: 'Thoughtful Gifts', description: 'Perfect gifts for your loved ones' },
    snacks: { title: 'Tasty Snacks', description: 'Mouth-watering snacks and treats' },
    combos: { title: 'Special Combos', description: 'Best value combo offers' },
};

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

export default function CategoryPage() {
    const params = useParams();
    const category = params.slug as string;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const info = categoryInfo[category] || { title: category, description: '' };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let filtered = allProducts.filter((p) => p.category === category);

            if (priceRange.min) {
                filtered = filtered.filter((p) => (p.discountPrice || p.price) >= parseInt(priceRange.min));
            }
            if (priceRange.max) {
                filtered = filtered.filter((p) => (p.discountPrice || p.price) <= parseInt(priceRange.max));
            }

            switch (sortBy) {
                case 'price-low':
                    filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                    break;
                case 'price-high':
                    filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                    break;
                case 'rating':
                    filtered.sort((a, b) => b.averageRating - a.averageRating);
                    break;
            }

            setProducts(filtered);
            setLoading(false);
        }, 300);
    }, [category, sortBy, priceRange]);

    return (
        <div className="min-h-screen bg-cream-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <div className="container-custom py-12 text-center">
                    <h1 className="text-4xl font-bold mb-2 capitalize">{info.title}</h1>
                    <p className="text-white/80">{info.description}</p>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5" />
                                Filters
                            </h3>

                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                                <div className="flex gap-2">
                                    <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                            </div>

                            <Button variant="outline" fullWidth onClick={() => setPriceRange({ min: '', max: '' })}>
                                Clear Filters
                            </Button>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">{products.length} products</p>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-white rounded-xl shadow-sm border-0 text-sm font-medium">
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Spinner size="lg" />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500">No products found in this category</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product, index) => (
                                    <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
