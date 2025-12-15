// Cart Store for Admin Panel - Stub
// Admin panel doesn't need cart functionality

import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    discountPrice?: number;
    weight?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    updateQuantity: (id, quantity) => { },
    clearCart: () => { },
    getTotalItems: () => 0,
    getSubtotal: () => 0,
}));
