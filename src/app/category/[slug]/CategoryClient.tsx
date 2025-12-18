'use client';

import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

interface CategoryClientProps {
    initialProducts: Product[];
    category: string;
}

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

export default function CategoryClient({ initialProducts, category }: CategoryClientProps) {
    const [products, setProducts] = useState(initialProducts); // Or use derived state if we want to filter from initial set
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const info = categoryInfo[category] || { title: category, description: '' };

    // Derived state for sorting/filtering - fast and efficient
    const displayedProducts = useMemo(() => {
        let filtered = [...initialProducts];

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

        return filtered;
    }, [initialProducts, sortBy, priceRange]);


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
                            <p className="text-gray-600">{displayedProducts.length} products</p>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-white rounded-xl shadow-sm border-0 text-sm font-medium">
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {displayedProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500">No products found in this category</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {displayedProducts.map((product, index) => (
                                    <div
                                        key={product._id}
                                        className="animate-fadeIn"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
