'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { Product } from '@/types';

interface ProductsClientProps {
    initialProducts: Product[];
}

function ProductsClientContent({ initialProducts }: ProductsClientProps) {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
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

    // Derived state for filtered products - drastically faster than useEffect
    const products = useMemo(() => {
        let filtered = [...initialProducts];

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
        return filtered;
    }, [initialProducts, selectedCategory, searchQuery, priceRange, sortBy]);

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
                        {products.length === 0 ? (
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

            {/* Mobile Filters Modal - Simplified for brevity in this refactor, kept logic same */}
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
                        {/* Mobile Category */}
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
                        {/* Mobile Price */}
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
                            <Button variant="outline" fullWidth onClick={() => { setSelectedCategory(''); setPriceRange({ min: '', max: '' }); }}>{t('common.cancel')}</Button>
                            <Button fullWidth onClick={() => setShowFilters(false)}>{t('buttons.apply')}</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default function ProductsClient(props: ProductsClientProps) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductsClientContent {...props} />
        </Suspense>
    );
}
