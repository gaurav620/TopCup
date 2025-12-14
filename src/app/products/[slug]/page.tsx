'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';
import ProductCard, { Product } from '@/components/product/ProductCard';

// Complete products database matching all products from /products page
const PRODUCTS_DB: Record<string, any> = {
    // CAKES
    'chocolate-truffle-cake': {
        _id: '1',
        name: 'Chocolate Truffle Cake',
        slug: 'chocolate-truffle-cake',
        description: 'Indulge in our signature Chocolate Truffle Cake, crafted with layers of rich Belgian chocolate sponge, silky chocolate ganache, and topped with elegant chocolate shavings. Perfect for birthdays, anniversaries, or any celebration that calls for something truly special.',
        shortDescription: 'Rich Belgian chocolate cake with ganache',
        price: 700,
        discountPrice: 350,
        category: 'cakes',
        subcategory: 'Chocolate Cakes',
        images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
            'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800',
        ],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Belgian Chocolate', 'Fresh Cream', 'Eggs', 'Flour', 'Sugar'],
        averageRating: 4.8,
        totalReviews: 156,
        isBestseller: true,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Priya S.', rating: 5, comment: 'Best chocolate cake I ever had! Super moist and rich.', date: '2 days ago' },
            { user: 'Rahul V.', rating: 5, comment: 'Ordered for my wife\'s birthday. She loved it!', date: '1 week ago' },
        ],
    },
    'vanilla-strawberry-cake': {
        _id: '9',
        name: 'Vanilla Strawberry Cake',
        slug: 'vanilla-strawberry-cake',
        description: 'A delightful combination of fluffy vanilla sponge layered with fresh strawberries and whipped cream. Light, fruity, and perfect for summer celebrations.',
        shortDescription: 'Fresh strawberries with vanilla cream',
        price: 700,
        discountPrice: 350,
        category: 'cakes',
        subcategory: 'Fruit Cakes',
        images: [
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        ],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Fresh Strawberries', 'Vanilla', 'Whipped Cream', 'Flour', 'Sugar'],
        averageRating: 4.6,
        totalReviews: 76,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Meera K.', rating: 5, comment: 'Love the fresh strawberries! So delicious.', date: '3 days ago' },
        ],
    },
    'butterscotch-crunch-cake': {
        _id: '13',
        name: 'Butterscotch Crunch Cake',
        slug: 'butterscotch-crunch-cake',
        description: 'Classic butterscotch cake with crunchy caramel bits and smooth butterscotch frosting. A nostalgic favorite that brings back sweet memories.',
        shortDescription: 'Butterscotch with crunchy caramel',
        price: 700,
        discountPrice: 350,
        category: 'cakes',
        images: ['https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800'],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Butterscotch', 'Caramel', 'Cream', 'Flour'],
        averageRating: 4.6,
        totalReviews: 82,
        deliveryInfo: 'Same day delivery available',
        reviews: [],
    },
    'red-velvet-delight': {
        _id: '2',
        name: 'Red Velvet Delight',
        slug: 'red-velvet-delight',
        description: 'Experience the classic elegance of our Red Velvet Cake with its distinctive red color, velvety texture, and smooth cream cheese frosting. A timeless favorite that never goes out of style.',
        shortDescription: 'Classic red velvet with cream cheese',
        price: 900,
        discountPrice: 450,
        category: 'cakes',
        images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800'],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Cocoa', 'Cream Cheese', 'Buttermilk'],
        averageRating: 4.7,
        totalReviews: 98,
        isBestseller: true,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Sneha M.', rating: 5, comment: 'Perfect red velvet! The frosting is amazing.', date: '1 day ago' },
        ],
    },
    'black-forest-cake': {
        _id: '5',
        name: 'Black Forest Cake',
        slug: 'black-forest-cake',
        description: 'Classic German Black Forest cake with layers of chocolate sponge, whipped cream, and cherries. A timeless favorite that combines rich chocolate with fresh cherry flavor.',
        shortDescription: 'Chocolate sponge with cherries and cream',
        price: 800,
        discountPrice: 400,
        category: 'cakes',
        images: [
            'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        ],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Chocolate Sponge', 'Whipped Cream', 'Cherries', 'Dark Chocolate'],
        averageRating: 4.5,
        totalReviews: 89,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Amit K.', rating: 5, comment: 'Love the cherry flavor! Perfect balance.', date: '2 days ago' },
        ],
    },
    'coffee-mocha-cake': {
        _id: '15',
        name: 'Coffee Mocha Cake',
        slug: 'coffee-mocha-cake',
        description: 'Rich coffee-flavored cake with mocha frosting for coffee lovers. Perfect blend of coffee and chocolate.',
        shortDescription: 'Coffee cake with mocha frosting',
        price: 900,
        discountPrice: 450,
        category: 'cakes',
        images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800'],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Coffee', 'Cocoa', 'Cream', 'Sugar'],
        averageRating: 4.8,
        totalReviews: 123,
        isBestseller: true,
        deliveryInfo: 'Same day delivery available',
        reviews: [],
    },
    'pineapple-fresh-cake': {
        _id: '12',
        name: 'Pineapple Fresh Cake',
        slug: 'pineapple-fresh-cake',
        description: 'Light and refreshing pineapple cake with fresh pineapple chunks and whipped cream.',
        shortDescription: 'Fresh pineapple with cream',
        price: 700,
        discountPrice: 350,
        category: 'cakes',
        images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Fresh Pineapple', 'Whipped Cream', 'Vanilla'],
        averageRating: 4.5,
        totalReviews: 67,
        deliveryInfo: 'Same day delivery available',
        reviews: [],
    },
    'mango-delight-cake': {
        _id: '14',
        name: 'Mango Delight Cake',
        slug: 'mango-delight-cake',
        description: 'Tropical mango-flavored cake perfect for mango lovers. Made with real mango pulp.',
        shortDescription: 'Real mango pulp cake',
        price: 800,
        discountPrice: 400,
        category: 'cakes',
        images: ['https://images.unsplash.com/photo-1519869325930-281384150729?w=800'],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Mango Pulp', 'Cream', 'Vanilla'],
        averageRating: 4.7,
        totalReviews: 54,
        deliveryInfo: 'Same day delivery available',
        reviews: [],
    },

    // GIFTS
    'premium-gift-hamper': {
        _id: '3',
        name: 'Premium Gift Hamper',
        slug: 'premium-gift-hamper',
        description: 'Luxurious gift hamper with assorted chocolates, cookies, and treats. Perfect for special occasions.',
        shortDescription: 'Luxury assorted gift basket',
        price: 3000,
        discountPrice: 1500,
        category: 'gifts',
        images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'],
        servings: 'Multiple items',
        averageRating: 4.9,
        totalReviews: 67,
        isFeatured: true,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'luxury-chocolate-gift-set': {
        _id: '8',
        name: 'Luxury Chocolate Gift Set',
        slug: 'luxury-chocolate-gift-set',
        description: 'Premium chocolates beautifully packaged. Perfect gift for chocolate lovers.',
        shortDescription: 'Premium chocolate collection',
        price: 2000,
        discountPrice: 1000,
        category: 'gifts',
        images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=800'],
        averageRating: 4.8,
        totalReviews: 112,
        isBestseller: true,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'anniversary-gift-basket': {
        _id: '10',
        name: 'Anniversary Gift Basket',
        slug: 'anniversary-gift-basket',
        description: 'Special anniversary gift basket with roses, chocolates, and cake.',
        shortDescription: 'Anniversary special hamper',
        price: 5000,
        discountPrice: 2500,
        category: 'gifts',
        images: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=800'],
        averageRating: 4.9,
        totalReviews: 54,
        isFeatured: true,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'birthday-surprise-box': {
        _id: '16',
        name: 'Birthday Surprise Box',
        slug: 'birthday-surprise-box',
        description: 'Birthday special surprise box with cake, balloons, and treats.',
        shortDescription: 'Birthday celebration box',
        price: 2600,
        discountPrice: 1300,
        category: 'gifts',
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
        averageRating: 4.7,
        totalReviews: 89,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'thank-you-gift-pack': {
        _id: '17',
        name: 'Thank You Gift Pack',
        slug: 'thank-you-gift-pack',
        description: 'Thoughtful thank you gift with cookies and chocolates.',
        shortDescription: 'Gratitude gift pack',
        price: 1600,
        discountPrice: 800,
        category: 'gifts',
        images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800'],
        averageRating: 4.6,
        totalReviews: 45,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'diwali-special-hamper': {
        _id: '18',
        name: 'Diwali Special Hamper',
        slug: 'diwali-special-hamper',
        description: 'Festive Diwali hamper with sweets, dry fruits, and treats.',
        shortDescription: 'Festival special hamper',
        price: 4000,
        discountPrice: 2000,
        category: 'gifts',
        images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800'],
        averageRating: 4.9,
        totalReviews: 156,
        isBestseller: true,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },

    // SNACKS
    'assorted-cookies-box': {
        _id: '4',
        name: 'Assorted Cookies Box',
        slug: 'assorted-cookies-box',
        description: 'Variety of handcrafted cookies in different flavors.',
        shortDescription: 'Mixed cookies variety pack',
        price: 800,
        discountPrice: 400,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800'],
        weight: '500g',
        averageRating: 4.6,
        totalReviews: 234,
        isBestseller: true,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'gourmet-brownie-box': {
        _id: '7',
        name: 'Gourmet Brownie Box',
        slug: 'gourmet-brownie-box',
        description: 'Fudgy chocolate brownies, freshly baked.',
        shortDescription: 'Premium chocolate brownies',
        price: 900,
        discountPrice: 450,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800'],
        weight: '400g',
        averageRating: 4.7,
        totalReviews: 178,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'dry-fruits-premium-box': {
        _id: '11',
        name: 'Dry Fruits Premium Box',
        slug: 'dry-fruits-premium-box',
        description: 'Premium selection of dry fruits and nuts.',
        shortDescription: 'Mixed dry fruits',
        price: 1800,
        discountPrice: 900,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800'],
        weight: '500g',
        averageRating: 4.7,
        totalReviews: 132,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'chocolate-chip-cookies': {
        _id: '19',
        name: 'Chocolate Chip Cookies',
        slug: 'chocolate-chip-cookies',
        description: 'Classic chocolate chip cookies, soft and chewy.',
        shortDescription: 'Soft chocolate chip cookies',
        price: 600,
        discountPrice: 300,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800'],
        weight: '300g',
        averageRating: 4.5,
        totalReviews: 198,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'almond-biscotti-pack': {
        _id: '20',
        name: 'Almond Biscotti Pack',
        slug: 'almond-biscotti-pack',
        description: 'Crunchy Italian biscotti with almonds.',
        shortDescription: 'Italian almond biscotti',
        price: 700,
        discountPrice: 350,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800'],
        weight: '250g',
        averageRating: 4.6,
        totalReviews: 87,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'mixed-nuts-jar': {
        _id: '21',
        name: 'Mixed Nuts Jar',
        slug: 'mixed-nuts-jar',
        description: 'Roasted and salted mixed nuts in a jar.',
        shortDescription: 'Roasted mixed nuts',
        price: 1200,
        discountPrice: 600,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800'],
        weight: '500g',
        averageRating: 4.8,
        totalReviews: 165,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'chocolate-truffle-box': {
        _id: '22',
        name: 'Chocolate Truffle Box',
        slug: 'chocolate-truffle-box',
        description: 'Assorted chocolate truffles, handcrafted.',
        shortDescription: 'Handcrafted truffles',
        price: 900,
        discountPrice: 450,
        category: 'snacks',
        images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800'],
        weight: '250g',
        averageRating: 4.7,
        totalReviews: 213,
        isBestseller: true,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },

    // COMBOS
    'birthday-celebration-box': {
        _id: '6',
        name: 'Birthday Celebration Box',
        slug: 'birthday-celebration-box',
        description: 'Complete birthday celebration package with cake, balloons, and treats.',
        shortDescription: 'Birthday combo package',
        price: 4000,
        discountPrice: 2000,
        category: 'combos',
        images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800'],
        averageRating: 4.9,
        totalReviews: 45,
        isFeatured: true,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'party-pack-combo': {
        _id: '23',
        name: 'Party Pack Combo',
        slug: 'party-pack-combo',
        description: 'Party essentials combo with snacks, cake, and decorations.',
        shortDescription: 'Complete party pack',
        price: 6000,
        discountPrice: 3000,
        category: 'combos',
        images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800'],
        averageRating: 4.8,
        totalReviews: 67,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'family-treat-combo': {
        _id: '24',
        name: 'Family Treat Combo',
        slug: 'family-treat-combo',
        description: 'Family combo with cake, cookies, and snacks.',
        shortDescription: 'Family sharing combo',
        price: 3400,
        discountPrice: 1700,
        category: 'combos',
        images: ['https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800'],
        averageRating: 4.7,
        totalReviews: 89,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },
    'romantic-date-night': {
        _id: '25',
        name: 'Romantic Date Night',
        slug: 'romantic-date-night',
        description: 'Romantic combo with cake, chocolates, and candles.',
        shortDescription: 'Date night special',
        price: 3800,
        discountPrice: 1900,
        category: 'combos',
        images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800'],
        averageRating: 4.9,
        totalReviews: 112,
        isBestseller: true,
        deliveryInfo: 'Free delivery',
        reviews: [],
    },

    // CHRISTMAS SPECIAL PRODUCTS
    'christmas-plum-cake': {
        _id: 'xmas-1',
        name: 'Christmas Plum Cake',
        slug: 'christmas-plum-cake',
        description: 'Traditional Christmas plum cake loaded with rich fruits, nuts, and aromatic spices. Aged to perfection for the festive season. A must-have for your Christmas celebrations!',
        shortDescription: 'Traditional fruit cake',
        price: 1200,
        discountPrice: 999,
        category: 'cakes',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800'],
        weight: '1kg',
        servings: '12-15 people',
        ingredients: ['Dried Fruits', 'Nuts', 'Spices', 'Rum', 'Butter'],
        averageRating: 4.9,
        totalReviews: 145,
        isBestseller: true,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Maria C.', rating: 5, comment: 'Best Christmas cake ever! So rich and flavorful.', date: '1 day ago' },
            { user: 'John D.', rating: 5, comment: 'Perfect for the holidays. Family loved it!', date: '3 days ago' },
        ],
    },
    'gingerbread-house-cake': {
        _id: 'xmas-2',
        name: 'Gingerbread House Cake',
        slug: 'gingerbread-house-cake',
        description: 'Adorable gingerbread house shaped cake with spiced sponge, cream cheese frosting, and decorated with edible gingerbread cookies. A showstopper for your Christmas table!',
        shortDescription: 'Decorative gingerbread cake',
        price: 1500,
        discountPrice: 1299,
        category: 'cakes',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800'],
        weight: '1.2kg',
        servings: '15-18 people',
        ingredients: ['Gingerbread', 'Cream Cheese', 'Molasses', 'Cinnamon', 'Ginger'],
        averageRating: 4.8,
        totalReviews: 98,
        isFeatured: true,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Sarah K.', rating: 5, comment: 'Absolutely stunning! Kids were amazed.', date: '2 days ago' },
        ],
    },
    'snow-white-vanilla-cake': {
        _id: 'xmas-3',
        name: 'Snow White Vanilla Cake',
        slug: 'snow-white-vanilla-cake',
        description: 'Pure and elegant vanilla cake with white chocolate ganache and coconut flakes. Light as snow and perfect for winter celebrations.',
        shortDescription: 'White chocolate vanilla cake',
        price: 800,
        discountPrice: 649,
        category: 'cakes',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800'],
        weight: '800g',
        servings: '10-12 people',
        ingredients: ['Vanilla', 'White Chocolate', 'Coconut', 'Cream'],
        averageRating: 4.7,
        totalReviews: 67,
        deliveryInfo: 'Same day delivery available',
        reviews: [],
    },
    'santas-surprise-box': {
        _id: 'xmas-4',
        name: "Santa's Surprise Box",
        slug: 'santas-surprise-box',
        description: 'Special Christmas gift box filled with assorted treats, chocolates, cookies, and a mini cake. Perfect surprise gift for loved ones this Christmas!',
        shortDescription: 'Christmas gift hamper',
        price: 2500,
        discountPrice: 1999,
        category: 'gifts',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800'],
        servings: 'Multiple items',
        averageRating: 4.9,
        totalReviews: 156,
        isBestseller: true,
        deliveryInfo: 'Free delivery',
        reviews: [
            { user: 'Robert M.', rating: 5, comment: 'Kids absolutely loved the surprise!', date: '1 day ago' },
        ],
    },
    'christmas-joy-hamper': {
        _id: 'xmas-5',
        name: 'Christmas Joy Hamper',
        slug: 'christmas-joy-hamper',
        description: 'Premium Christmas hamper with luxury chocolates, gourmet cookies, festive decorations, and premium tea selection. Spread the joy of Christmas!',
        shortDescription: 'Premium festive hamper',
        price: 3500,
        discountPrice: 2999,
        category: 'gifts',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'],
        servings: 'Multiple items',
        averageRating: 4.8,
        totalReviews: 189,
        isFeatured: true,
        deliveryInfo: 'Free delivery',
        reviews: [
            { user: 'Emily T.', rating: 5, comment: 'Beautiful packaging and quality products!', date: '2 days ago' },
        ],
    },
    'festive-cupcake-set': {
        _id: 'xmas-6',
        name: 'Festive Cupcake Set',
        slug: 'festive-cupcake-set',
        description: 'Set of 12 beautifully decorated Christmas cupcakes with various flavors including chocolate, vanilla, red velvet, and gingerbread. Perfect for parties!',
        shortDescription: 'Christmas cupcakes (12 pcs)',
        price: 900,
        discountPrice: 749,
        category: 'snacks',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800'],
        weight: '600g',
        servings: '12 cupcakes',
        ingredients: ['Assorted Flavors', 'Buttercream', 'Festive Decorations'],
        averageRating: 4.6,
        totalReviews: 234,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'candy-cane-cookies': {
        _id: 'xmas-7',
        name: 'Candy Cane Cookies',
        slug: 'candy-cane-cookies',
        description: 'Delicious peppermint flavored cookies shaped like candy canes. Crunchy, festive, and perfect with hot chocolate!',
        shortDescription: 'Peppermint cookies',
        price: 650,
        discountPrice: 499,
        category: 'snacks',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800'],
        weight: '400g',
        servings: '20-25 cookies',
        ingredients: ['Peppermint', 'Sugar', 'Butter', 'Flour'],
        averageRating: 4.7,
        totalReviews: 178,
        deliveryInfo: 'Same day delivery',
        reviews: [],
    },
    'christmas-mega-combo': {
        _id: 'xmas-8',
        name: 'Christmas Mega Combo',
        slug: 'christmas-mega-combo',
        description: 'Ultimate Christmas combo package with 1kg cake, gift hamper, decorations, party essentials, and festive treats. Everything you need for a grand celebration!',
        shortDescription: 'Complete Christmas package',
        price: 5000,
        discountPrice: 3999,
        category: 'combos',
        subcategory: 'Christmas Specials',
        images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800'],
        servings: 'Multiple items',
        averageRating: 5.0,
        totalReviews: 267,
        isBestseller: true,
        isFeatured: true,
        deliveryInfo: 'Free delivery',
        reviews: [
            { user: 'David L.', rating: 5, comment: 'Best value for money! Party was a huge success.', date: '1 day ago' },
        ],
    },
};

const relatedProducts: Product[] = [
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
        _id: '5',
        name: 'Black Forest Cake',
        slug: 'black-forest-cake',
        price: 800,
        discountPrice: 400,
        images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500'],
        category: 'cakes',
        averageRating: 4.5,
        totalReviews: 89,
        weight: '500g',
    },
];

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { t } = useTranslation();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    // Load product based on slug
    useEffect(() => {
        if (slug) {
            const foundProduct = PRODUCTS_DB[slug];
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                // Product not found - show error or redirect
                toast.error('Product not found');
                router.push('/products');
            }
            setLoading(false);
        }
    }, [slug, router]);

    if (loading || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const discount = product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product._id,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice,
                image: product.images[0],
                weight: product.weight,
            });
        }
        toast.success(t('productDetail.addedToCart', { name: product.name }));
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    return (
        <div className="min-h-screen bg-cream-50 py-8">
            {/* Breadcrumb */}
            <div className="container-custom mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-primary-600">{t('nav.home')}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/products" className="hover:text-primary-600">{t('nav.products')}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/category/${product.category}`} className="hover:text-primary-600 capitalize">
                        {product.category}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">{product.name}</span>
                </div>
            </div>

            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div>
                        <div className="bg-white rounded-2xl p-4 mb-4 relative overflow-hidden">
                            {product.isBestseller && (
                                <Badge className="absolute top-6 left-6 z-10">{t('common.bestseller')}</Badge>
                            )}
                            {discount > 0 && (
                                <Badge variant="primary" className="absolute top-6 right-6 z-10 bg-red-600 text-white">
                                    -{discount}% OFF
                                </Badge>
                            )}
                            <div className="aspect-square relative">
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-3 gap-3">
                                {product.images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx
                                            ? 'border-primary-500 scale-105'
                                            : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <Image src={img} alt="" width={150} height={150} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-2">
                                {product.subcategory || product.category}
                            </p>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.averageRating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium">{product.averageRating}</span>
                                <span className="text-sm text-gray-500">
                                    ({product.totalReviews} {t('productDetail.reviews')})
                                </span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-gray-900">₹{product.discountPrice || product.price}</span>
                            {product.discountPrice && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                                    <span className="text-lg font-semibold text-green-600">Save ₹{product.price - product.discountPrice}</span>
                                </>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                        {product.weight && product.servings && (
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">{t('productDetail.weight')}</p>
                                    <p className="font-semibold text-gray-900">{product.weight}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">{t('productDetail.serves')}</p>
                                    <p className="font-semibold text-gray-900">{product.servings}</p>
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-700 mb-3">{t('common.quantity')}</p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mb-6">
                            <Button size="lg" onClick={handleAddToCart} className="flex-1">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {t('buttons.addToCart')}
                            </Button>
                            <Button size="lg" variant="primary" onClick={handleBuyNow} className="flex-1">
                                {t('buttons.buyNow')}
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-cream-100 rounded-xl">
                            <div className="text-center">
                                <Truck className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                                <p className="text-xs font-medium">{t('productDetail.features.freeDelivery')}</p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                                <p className="text-xs font-medium">{t('productDetail.features.fresh')}</p>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                                <p className="text-xs font-medium">{t('productDetail.features.easyReturns')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">{t('productDetail.relatedProducts')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
