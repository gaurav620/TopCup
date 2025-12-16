import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    quantity: number;
    weight?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    _hasHydrated: boolean;

    // Actions
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (isOpen: boolean) => void;
    setHasHydrated: (state: boolean) => void;

    // Computed
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            _hasHydrated: false,

            addItem: (item) => {
                const items = get().items;
                const existingItem = items.find((i) => i.id === item.id);

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    });
                } else {
                    set({ items: [...items, { ...item, quantity: 1 }] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },

            updateQuantity: (id, quantity) => {
                if (quantity < 1) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set({ isOpen: !get().isOpen });
            },

            setCartOpen: (isOpen) => {
                set({ isOpen });
            },

            setHasHydrated: (state) => {
                set({ _hasHydrated: state });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = item.discountPrice || item.price;
                    return total + price * item.quantity;
                }, 0);
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => {
                    const price = item.discountPrice || item.price;
                    return total + price * item.quantity;
                }, 0);
            },
        }),
        {
            name: 'topcup-cart',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ items: state.items }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
