import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Coupon {
    code: string;
    description: string;
    type: 'percentage' | 'fixed';
    value: number;
    minOrder?: number;
    maxDiscount?: number;
    expiresAt?: Date;
    isActive: boolean;
}

interface CouponStore {
    availableCoupons: Coupon[];
    appliedCoupon: Coupon | null;
    applyCoupon: (code: string, cartTotal: number) => { success: boolean; message: string; discount: number };
    removeCoupon: () => void;
    calculateDiscount: (cartTotal: number) => number;
}

// Available coupons
const defaultCoupons: Coupon[] = [
    {
        code: 'WELCOME50',
        description: '50% off on your first order',
        type: 'percentage',
        value: 50,
        maxDiscount: 500,
        isActive: true,
    },
    {
        code: 'TOPCUP10',
        description: 'Get ₹10 extra off on all orders',
        type: 'fixed',
        value: 10,
        isActive: true,
    },
    {
        code: 'SWEET25',
        description: '₹25 off on orders above ₹500',
        type: 'fixed',
        value: 25,
        minOrder: 500,
        isActive: true,
    },
    {
        code: 'MEGA15',
        description: '15% off on orders above ₹1000',
        type: 'percentage',
        value: 15,
        minOrder: 1000,
        maxDiscount: 300,
        isActive: true,
    },
];

export const useCouponStore = create<CouponStore>()(
    persist(
        (set, get) => ({
            availableCoupons: defaultCoupons,
            appliedCoupon: null,

            applyCoupon: (code: string, cartTotal: number) => {
                const coupon = get().availableCoupons.find(
                    (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
                );

                if (!coupon) {
                    return {
                        success: false,
                        message: 'Invalid coupon code',
                        discount: 0,
                    };
                }

                // Check minimum order requirement
                if (coupon.minOrder && cartTotal < coupon.minOrder) {
                    return {
                        success: false,
                        message: `Minimum order of ₹${coupon.minOrder} required`,
                        discount: 0,
                    };
                }

                // Check expiry
                if (coupon.expiresAt && new Date() > coupon.expiresAt) {
                    return {
                        success: false,
                        message: 'Coupon has expired',
                        discount: 0,
                    };
                }

                // Calculate discount
                let discount = 0;
                if (coupon.type === 'percentage') {
                    discount = (cartTotal * coupon.value) / 100;
                    if (coupon.maxDiscount) {
                        discount = Math.min(discount, coupon.maxDiscount);
                    }
                } else {
                    discount = coupon.value;
                }

                set({ appliedCoupon: coupon });

                return {
                    success: true,
                    message: `Coupon applied! You saved ₹${discount}`,
                    discount: Math.round(discount),
                };
            },

            removeCoupon: () => {
                set({ appliedCoupon: null });
            },

            calculateDiscount: (cartTotal: number) => {
                const { appliedCoupon } = get();
                if (!appliedCoupon) return 0;

                let discount = 0;
                if (appliedCoupon.type === 'percentage') {
                    discount = (cartTotal * appliedCoupon.value) / 100;
                    if (appliedCoupon.maxDiscount) {
                        discount = Math.min(discount, appliedCoupon.maxDiscount);
                    }
                } else {
                    discount = appliedCoupon.value;
                }

                return Math.round(discount);
            },
        }),
        {
            name: 'topcup-coupon',
        }
    )
);
