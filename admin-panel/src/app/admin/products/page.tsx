'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const products = [
    { _id: '1', name: 'Chocolate Truffle Cake', category: 'cakes', price: 899, discountPrice: 749, stock: 25, status: 'active', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100' },
    { _id: '2', name: 'Red Velvet Delight', category: 'cakes', price: 999, discountPrice: 849, stock: 18, status: 'active', image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=100' },
    { _id: '3', name: 'Premium Gift Hamper', category: 'gifts', price: 1999, discountPrice: 1499, stock: 12, status: 'active', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100' },
    { _id: '4', name: 'Assorted Cookies Box', category: 'snacks', price: 499, discountPrice: 399, stock: 0, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100' },
];

export default function AdminProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="container-custom py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-gray-600">Manage your product catalog</p>
                    </div>
                    <Link href="/admin/products/new"><Button leftIcon={<Plus className="w-5 h-5" />}>Add Product</Button></Link>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="bg-white rounded-2xl p-4 mb-6 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <span className="font-medium">{product.name}</span>
                                    </td>
                                    <td className="px-6 py-4 capitalize">{product.category}</td>
                                    <td className="px-6 py-4">₹{product.discountPrice || product.price}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4"><Badge variant={product.status === 'active' ? 'success' : 'danger'}>{product.status === 'active' ? 'Active' : 'Out of Stock'}</Badge></td>
                                    <td className="px-6 py-4 flex justify-end gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4" /></button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
