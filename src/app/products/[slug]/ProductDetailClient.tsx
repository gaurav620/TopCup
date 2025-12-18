'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';
import { Product } from '@/types';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

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

                        <div className="mb-6">
                            <div className="flex items-end gap-3 mb-2">
                                <span className="text-3xl font-bold text-gray-900">
                                    ₹{product.discountPrice || product.price}
                                </span>
                                {product.discountPrice && (
                                    <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                                )}
                            </div>
                            <p className="text-green-600 text-sm font-medium">{t('productDetail.inclusiveTax')}</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-6 mb-8 p-4 bg-white rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                    <Truck className="w-4 h-4 mr-1" /> {t('productDetail.delivery')}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                    <Shield className="w-4 h-4 mr-1" /> {t('productDetail.secure')}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                                    <RotateCcw className="w-4 h-4 mr-1" /> {t('productDetail.returns')}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-gray-200 rounded-xl bg-white w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:text-primary-600 transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:text-primary-600 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex gap-3 flex-1">
                                <Button
                                    fullWidth
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {t('buttons.addToCart')}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outline"
                                    onClick={handleBuyNow}
                                    className="flex-1 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200"
                                >
                                    {t('buttons.buyNow')}
                                </Button>
                            </div>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`p-3 rounded-xl border transition-all ${isWishlisted
                                    ? 'border-red-200 bg-red-50 text-red-500'
                                    : 'border-gray-200 bg-white hover:border-primary-200 hover:text-primary-600'
                                    }`}
                            >
                                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
