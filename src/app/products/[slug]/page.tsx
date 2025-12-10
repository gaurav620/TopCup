'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';
import ProductCard, { Product } from '@/components/product/ProductCard';

// Sample product data
const product = {
    _id: '1',
    name: 'Chocolate Truffle Cake',
    slug: 'chocolate-truffle-cake',
    description: 'Indulge in our signature Chocolate Truffle Cake, crafted with layers of rich Belgian chocolate sponge, silky chocolate ganache, and topped with elegant chocolate shavings. Perfect for birthdays, anniversaries, or any celebration that calls for something truly special.',
    shortDescription: 'Rich Belgian chocolate cake with ganache layers',
    price: 899,
    discountPrice: 749,
    category: 'cakes',
    subcategory: 'Chocolate Cakes',
    images: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800',
    ],
    weight: '1 kg',
    servings: '8-10 people',
    ingredients: ['Belgian Chocolate', 'Fresh Cream', 'Eggs', 'Flour', 'Sugar', 'Butter'],
    averageRating: 4.8,
    totalReviews: 156,
    isBestseller: true,
    deliveryInfo: 'Same day delivery available',
    reviews: [
        { user: 'Priya S.', rating: 5, comment: 'Best chocolate cake I ever had! Super moist and rich.', date: '2 days ago' },
        { user: 'Rahul V.', rating: 5, comment: 'Ordered for my wife\'s birthday. She loved it!', date: '1 week ago' },
        { user: 'Anita G.', rating: 4, comment: 'Great taste and beautiful presentation.', date: '2 weeks ago' },
    ],
};

const relatedProducts: Product[] = [
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
        _id: '9',
        name: 'Vanilla Strawberry Cake',
        slug: 'vanilla-strawberry-cake',
        price: 849,
        images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'],
        category: 'cakes',
        averageRating: 4.6,
        totalReviews: 76,
        weight: '1 kg',
    },
    {
        _id: '12',
        name: 'Pineapple Fresh Cake',
        slug: 'pineapple-fresh-cake',
        price: 749,
        images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500'],
        category: 'cakes',
        averageRating: 4.5,
        totalReviews: 67,
        weight: '1 kg',
    },
];

export default function ProductDetailPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const discount = Math.round(((product.price - (product.discountPrice || product.price)) / product.price) * 100);

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
        toast.success(`${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        window.location.href = '/cart';
    };

    return (
        <div className="min-h-screen bg-cream-50 py-8">
            <div className="container-custom">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-primary-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/products" className="hover:text-primary-600">Products</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/category/${product.category}`} className="hover:text-primary-600 capitalize">{product.category}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-square rounded-2xl overflow-hidden bg-white"
                        >
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.isBestseller && (
                                <Badge variant="warning" className="absolute top-4 left-4">
                                    Bestseller
                                </Badge>
                            )}
                            {discount > 0 && (
                                <Badge variant="danger" className="absolute top-4 right-4">
                                    -{discount}% OFF
                                </Badge>
                            )}
                        </motion.div>

                        <div className="flex gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary-500' : 'border-transparent'
                                        }`}
                                >
                                    <Image src={image} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-primary-600 font-medium uppercase tracking-wide mb-1">
                                        {product.subcategory}
                                    </p>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                                </div>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-3 rounded-xl transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.averageRating)
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="font-semibold">{product.averageRating}</span>
                                <span className="text-gray-500">({product.totalReviews} reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-primary-600">
                                    ₹{(product.discountPrice || product.price).toLocaleString('en-IN')}
                                </span>
                                {product.discountPrice && (
                                    <>
                                        <span className="text-xl text-gray-400 line-through">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </span>
                                        <Badge variant="success">Save ₹{(product.price - product.discountPrice).toLocaleString('en-IN')}</Badge>
                                    </>
                                )}
                            </div>

                            {/* Weight & Servings */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1 bg-cream-50 rounded-xl p-3 text-center">
                                    <p className="text-sm text-gray-500">Weight</p>
                                    <p className="font-semibold text-gray-900">{product.weight}</p>
                                </div>
                                <div className="flex-1 bg-cream-50 rounded-xl p-3 text-center">
                                    <p className="text-sm text-gray-500">Serves</p>
                                    <p className="font-semibold text-gray-900">{product.servings}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6">{product.description}</p>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-medium">Quantity:</span>
                                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mb-6">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    fullWidth
                                    leftIcon={<ShoppingCart className="w-5 h-5" />}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                                <Button size="lg" fullWidth onClick={handleBuyNow}>
                                    Buy Now
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                                <div className="text-center">
                                    <Truck className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                                    <p className="text-xs text-gray-600">Free Delivery</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="w-6 h-6 mx-auto text-green-500 mb-2" />
                                    <p className="text-xs text-gray-600">100% Fresh</p>
                                </div>
                                <div className="text-center">
                                    <RotateCcw className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                                    <p className="text-xs text-gray-600">Easy Returns</p>
                                </div>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ingredient, index) => (
                                    <span key={index} className="px-3 py-1 bg-cream-100 rounded-full text-sm text-gray-700">
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                    <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="pb-6 border-b border-gray-100 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                                            {review.user.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{review.user}</p>
                                            <p className="text-sm text-gray-500">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
