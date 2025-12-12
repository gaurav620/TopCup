'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard, { Product } from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { useTranslation } from '@/hooks/useTranslation';

// Sample products - in production, fetch from API
const allProducts: Product[] = [
    // CAKES - Basic (₹700 → ₹350 after 50% off)
    { _id: '1', name: 'Chocolate Truffle Cake', slug: 'chocolate-truffle-cake', price: 700, discountPrice: 350, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 156, isBestseller: true, weight: '500g' },
    { _id: '13', name: 'Butterscotch Crunch Cake', slug: 'butterscotch-crunch-cake', price: 700, discountPrice: 350, images: ['https://images.unsplash.com/photo-1562440499-64c9a111f713?w=500'], category: 'cakes', averageRating: 4.6, totalReviews: 82, weight: '500g' },
    { _id: '9', name: 'Vanilla Strawberry Cake', slug: 'vanilla-strawberry-cake', price: 700, discountPrice: 350, images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'], category: 'cakes', averageRating: 4.6, totalReviews: 76, weight: '500g' },

    // CAKES - Premium (₹800-900 → ₹400-450 after 50% off)
    { _id: '2', name: 'Red Velvet Delight', slug: 'red-velvet-delight', price: 900, discountPrice: 450, images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 98, isBestseller: true, weight: '500g' },
    { _id: '5', name: 'Black Forest Cake', slug: 'black-forest-cake', price: 800, discountPrice: 400, images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500'], category: 'cakes', averageRating: 4.5, totalReviews: 89, weight: '500g' },
    { _id: '15', name: 'Coffee Mocha Cake', slug: 'coffee-mocha-cake', price: 900, discountPrice: 450, images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 123, isBestseller: true, weight: '500g' },
    { _id: '12', name: 'Pineapple Fresh Cake', slug: 'pineapple-fresh-cake', price: 700, discountPrice: 350, images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500'], category: 'cakes', averageRating: 4.5, totalReviews: 67, weight: '500g' },
    { _id: '14', name: 'Mango Delight Cake', slug: 'mango-delight-cake', price: 800, discountPrice: 400, images: ['https://images.unsplash.com/photo-1519869325930-281384150729?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 54, weight: '500g' },

    // GIFTS (₹2000-6000 → ₹1000-3000 after 50% off)
    { _id: '3', name: 'Premium Gift Hamper', slug: 'premium-gift-hamper', price: 3000, discountPrice: 1500, images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 67, isFeatured: true },
    { _id: '8', name: 'Luxury Chocolate Gift Set', slug: 'luxury-chocolate-gift-set', price: 2000, discountPrice: 1000, images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=500'], category: 'gifts', averageRating: 4.8, totalReviews: 112, isBestseller: true },
    { _id: '10', name: 'Anniversary Gift Basket', slug: 'anniversary-gift-basket', price: 5000, discountPrice: 2500, images: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 54, isFeatured: true },
    { _id: '16', name: 'Birthday Surprise Box', slug: 'birthday-surprise-box', price: 2600, discountPrice: 1300, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'], category: 'gifts', averageRating: 4.7, totalReviews: 89 },
    { _id: '17', name: 'Thank You Gift Pack', slug: 'thank-you-gift-pack', price: 1600, discountPrice: 800, images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'], category: 'gifts', averageRating: 4.6, totalReviews: 45 },
    { _id: '18', name: 'Diwali Special Hamper', slug: 'diwali-special-hamper', price: 4000, discountPrice: 2000, images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 156, isBestseller: true },

    // SNACKS (₹700-1800 → ₹350-900 after 50% off)
    { _id: '4', name: 'Assorted Cookies Box', slug: 'assorted-cookies-box', price: 800, discountPrice: 400, images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 234, isBestseller: true, weight: '500g' },
    { _id: '7', name: 'Gourmet Brownie Box', slug: 'gourmet-brownie-box', price: 900, discountPrice: 450, images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 178, weight: '400g' },
    { _id: '11', name: 'Dry Fruits Premium Box', slug: 'dry-fruits-premium-box', price: 1800, discountPrice: 900, images: ['https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 132, weight: '500g' },
    { _id: '19', name: 'Chocolate Chip Cookies', slug: 'chocolate-chip-cookies', price: 600, discountPrice: 300, images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'], category: 'snacks', averageRating: 4.5, totalReviews: 198, weight: '300g' },
    { _id: '20', name: 'Almond Biscotti Pack', slug: 'almond-biscotti-pack', price: 700, discountPrice: 350, images: ['https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 87, weight: '250g' },
    { _id: '21', name: 'Mixed Nuts Jar', slug: 'mixed-nuts-jar', price: 1200, discountPrice: 600, images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500'], category: 'snacks', averageRating: 4.8, totalReviews: 165, weight: '500g' },
    { _id: '22', name: 'Chocolate Truffle Box', slug: 'chocolate-truffle-box', price: 900, discountPrice: 450, images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 213, isBestseller: true, weight: '250g' },

    // COMBOS (₹4000-7000 → ₹2000-3500 after 50% off)
    { _id: '6', name: 'Birthday Celebration Box', slug: 'birthday-celebration-box', price: 4000, discountPrice: 2000, images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 45, isFeatured: true },
    { _id: '23', name: 'Party Pack Combo', slug: 'party-pack-combo', price: 6000, discountPrice: 3000, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'], category: 'combos', averageRating: 4.8, totalReviews: 67 },
    { _id: '24', name: 'Family Treat Combo', slug: 'family-treat-combo', price: 3400, discountPrice: 1700, images: ['https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500'], category: 'combos', averageRating: 4.7, totalReviews: 89 },
    { _id: '25', name: 'Romantic Date Night', slug: 'romantic-date-night', price: 3800, discountPrice: 1900, images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 112, isBestseller: true },
];





function ProductsContent() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        { value: '', label: t('products.filters.category') + ': ' + t('nav.products') },
        { value: 'cakes', label: t('nav.cakes') },
        { value: 'gifts', label: t('common.gifts') || 'Gifts' },
        { value: 'snacks', label: t('common.snacks') || 'Snacks' },
        { value: 'combos', label: t('common.combos') || 'Combos' },
    ];

    const sortOptions = [
        { value: 'newest', label: t('products.sortBy.newest') },
        { value: 'price-low', label: t('products.sortBy.priceLowHigh') },
        { value: 'price-high', label: t('products.sortBy.priceHighLow') },
        { value: 'rating', label: t('common.rating') || 'Highest Rated' },
        { value: 'popular', label: t('products.sortBy.popular') },
    ];

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            let filtered = [...allProducts];

            // Filter by category
            if (selectedCategory) {
                filtered = filtered.filter((p) => p.category === selectedCategory);
            }

            // Filter by search
            if (searchQuery) {
                filtered = filtered.filter((p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Filter by price
            if (priceRange.min) {
                filtered = filtered.filter((p) => (p.discountPrice || p.price) >= parseInt(priceRange.min));
            }
            if (priceRange.max) {
                filtered = filtered.filter((p) => (p.discountPrice || p.price) <= parseInt(priceRange.max));
            }

            // Sort
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
                case 'popular':
                    filtered.sort((a, b) => b.totalReviews - a.totalReviews);
                    break;
            }

            setProducts(filtered);
            setLoading(false);
        }, 500);
    }, [selectedCategory, sortBy, priceRange, searchQuery]);

    return (
        <div className="min-h-screen bg-cream-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="container-custom py-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {searchQuery ? `${t('common.search')}: "${searchQuery}"` : selectedCategory ? categories.find(c => c.value === selectedCategory)?.label : t('products.title')}
                    </h1>
                    <p className="text-gray-600">
                        {t('products.showingResults', { count: products.length.toString() })}
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5" />
                                {t('common.filters')}
                            </h3>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('products.filters.category')}</h4>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat.value}
                                                onChange={() => setSelectedCategory(cat.value)}
                                                className="text-primary-500 focus:ring-primary-500"
                                            />
                                            <span className="text-sm text-gray-600">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('products.filters.priceRange')}</h4>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => {
                                    setSelectedCategory('');
                                    setPriceRange({ min: '', max: '' });
                                }}
                            >
                                {t('common.filters')} {t('common.cancel')}
                            </Button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Sort & Filter Bar */}
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm text-gray-700 font-medium"
                            >
                                <Filter className="w-5 h-5" />
                                {t('common.filters')}
                            </button>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 hidden sm:block">{t('common.sortBy')}:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-white rounded-xl shadow-sm border-0 focus:ring-2 focus:ring-primary-500/20 text-sm font-medium text-gray-700"
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Products */}
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Spinner size="lg" />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500 mb-4">{t('products.noProducts')}</p>
                                <Button onClick={() => {
                                    setSelectedCategory('');
                                    setPriceRange({ min: '', max: '' });
                                }}>
                                    {t('common.cancel')} {t('common.filters')}
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product, index) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            {showFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg">{t('common.filters')}</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-3">{t('products.filters.category')}</h4>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <label key={cat.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="category-mobile"
                                            checked={selectedCategory === cat.value}
                                            onChange={() => setSelectedCategory(cat.value)}
                                            className="text-primary-500"
                                        />
                                        <span>{cat.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-3">{t('products.filters.priceRange')}</h4>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => {
                                    setSelectedCategory('');
                                    setPriceRange({ min: '', max: '' });
                                }}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button fullWidth onClick={() => setShowFilters(false)}>
                                {t('buttons.apply')}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
