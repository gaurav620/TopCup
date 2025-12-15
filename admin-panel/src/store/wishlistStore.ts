// Wishlist Store for Admin Panel - Stub
// Admin panel doesn't need wishlist functionality

import { create } from 'zustand';

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    discountPrice?: number;
    category?: string;
}

interface WishlistStore {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    clearWishlist: () => void;
    isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearWishlist: () => { },
    isInWishlist: (id) => false,
}));
