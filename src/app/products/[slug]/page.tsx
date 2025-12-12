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

// Sample products database 
const PRODUCTS_DB: Record<string, any> = {
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
        isBestseller: false,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Meera K.', rating: 5, comment: 'Love the fresh strawberries! So delicious.', date: '3 days ago' },
        ],
    },
    'butterscotch-crunch-cake': {
        _id: '13',
        name: 'Butterscotch Crunch Cake',
        slug: 'butterscotch-crunch-cake',
        description: 'Classic butterscotch cake with crunchy caramel bits and smooth butterscotch frosting.',
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
        description: 'Classic red velvet cake with smooth cream cheese frosting.',
        shortDescription: 'Red velvet with cream cheese',
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
        reviews: [],
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
        subcategory: 'Chocolate Cakes',
        images: [
            'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        ],
        weight: '500g',
        servings: '8-10 people',
        ingredients: ['Chocolate Sponge', 'Whipped Cream', 'Cherries', 'Dark Chocolate'],
        averageRating: 4.5,
        totalReviews: 89,
        isBestseller: false,
        deliveryInfo: 'Same day delivery available',
        reviews: [
            { user: 'Amit K.', rating: 5, comment: 'Love the cherry flavor! Perfect balance.', date: '2 days ago' },
            { user: 'Sonia R.', rating: 4, comment: 'Good taste, fresh cherries used.', date: '5 days ago' },
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
                // Fallback to first product
                setProduct(PRODUCTS_DB['chocolate-truffle-cake']);
            }
            setLoading(false);
        }
    }, [slug]);

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
                                <Badge variant="secondary" className="absolute top-6 right-6 z-10 text-red-600">
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
