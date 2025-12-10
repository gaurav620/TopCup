'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Plus, Search, Edit2, Trash2, Eye, ArrowLeft, X, Upload, DollarSign, Box, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'out-of-stock';
    image: string;
    description: string;
}

export default function ProductsPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        status: 'active',
        image: '',
        description: ''
    });

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth !== 'true') {
            router.push('/');
        } else {
            setIsAuth(true);
            fetchProducts();
        }
    }, [router]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/products');
            const data = await response.json();
            if (data.success) {
                // Map _id to id for frontend consistency
                const mappedProducts = data.products.map((p: any) => ({
                    id: p._id,
                    name: p.name,
                    category: p.category,
                    price: p.price,
                    stock: p.stock,
                    status: p.stock > 0 ? 'active' : 'out-of-stock',
                    image: p.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
                    description: p.description || ''
                }));
                setProducts(mappedProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuth || loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddProduct = () => {
        setModalMode('add');
        setSelectedProduct(null);
        setFormData({
            name: '',
            category: '',
            price: 0,
            stock: 0,
            status: 'active',
            image: '',
            description: ''
        });
        setShowModal(true);
    };

    const handleViewProduct = (product: Product) => {
        setModalMode('view');
        setSelectedProduct(product);
        setFormData(product);
        setShowModal(true);
    };

    const handleEditProduct = (product: Product) => {
        setModalMode('edit');
        setSelectedProduct(product);
        setFormData(product);
        setShowModal(true);
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Are you sure you want to delete this product? This will remove it from the database permanently.')) {
            try {
                const response = await fetch(`/api/products?id=${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (data.success) {
                    await fetchProducts(); // Refresh list
                    alert('Product deleted successfully!');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        category: formData.category,
                        price: formData.price,
                        stock: formData.stock,
                        images: [formData.image],
                        description: formData.description
                    })
                });
                const data = await response.json();
                if (data.success) {
                    await fetchProducts();
                    setShowModal(false);
                    alert('Product added successfully!');
                } else {
                    alert('Error: ' + data.error);
                }
            } else if (modalMode === 'edit' && selectedProduct) {
                const response = await fetch('/api/products', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: selectedProduct.id,
                        name: formData.name,
                        category: formData.category,
                        price: formData.price,
                        stock: formData.stock,
                        images: [formData.image],
                        description: formData.description
                    })
                });
                const data = await response.json();
                if (data.success) {
                    await fetchProducts();
                    setShowModal(false);
                    alert('Product updated successfully!');
                } else {
                    alert('Error: ' + data.error);
                }
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <Package className="w-7 h-7 text-blue-600" />
                                    Products
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">Manage your product catalog</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddProduct}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Stats */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-100">
                        <p className="text-sm text-gray-600 uppercase tracking-wider mb-1">PRODUCT</p>
                        <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100">
                        <p className="text-sm text-gray-600 uppercase tracking-wider mb-1">CATEGORY</p>
                        <p className="text-2xl font-bold text-gray-900">{new Set(products.map(p => p.category)).size}</p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">PRODUCT</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">CATEGORY</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">PRICE</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">STOCK</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">STATUS</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                {product.status === 'active' ? 'Active' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewProduct(product)}
                                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditProduct(product)}
                                                    className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for View/Add/Edit */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {modalMode === 'view' ? 'Product Details' : modalMode === 'edit' ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {modalMode === 'view' ? (
                                <div className="space-y-4">
                                    <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={formData.image || ''}
                                            alt={formData.name || 'Product'}
                                            width={600}
                                            height={400}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Product Name</p>
                                            <p className="text-lg font-bold text-gray-900">{formData.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Category</p>
                                            <p className="text-lg font-bold text-gray-900">{formData.category}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Price</p>
                                            <p className="text-lg font-bold text-green-600">₹{formData.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Stock</p>
                                            <p className="text-lg font-bold text-gray-900">{formData.stock}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 mb-1">Description</p>
                                        <p className="text-gray-700">{formData.description}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${formData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {formData.status === 'active' ? 'Active' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Cakes">Cakes</option>
                                                <option value="Gifts">Gifts</option>
                                                <option value="Snacks">Snacks</option>
                                                <option value="Combos">Combos</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                                            <input
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                            placeholder="https://..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'out-of-stock' })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="out-of-stock">Out of Stock</option>
                                        </select>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                                        >
                                            {modalMode === 'edit' ? 'Update Product' : 'Add Product'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
