'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    return (
        <div className="min-h-screen relative">
            {/* Snowfall Animation */}
            <Snowfall />

            {/* Christmas Hero */}
            <ChristmasHero />

            {/* Christmas Mega Sale Banner */}
            <section className="py-6 bg-gradient-to-r from-red-600 via-green-600 to-red-600 relative overflow-hidden">
                <parameter name="Complexity">10
