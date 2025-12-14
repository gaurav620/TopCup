// Firebase Analytics Service
// Track user events and conversions

import { logEvent, setUserId, setUserProperties, Analytics } from 'firebase/analytics';
import { analytics } from './firebase';

// User Events
export const trackUserLogin = (userId: string, method: string) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'login', { method });
        setUserId(analytics as Analytics, userId);
    }
};

export const trackUserSignup = (userId: string, method: string) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'sign_up', { method });
        setUserId(analytics as Analytics, userId);
    }
};

// Product Events
export const trackViewItem = (productId: string, productName: string, price: number, category: string) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'view_item', {
            item_id: productId,
            item_name: productName,
            price: price,
            currency: 'INR',
            item_category: category
        });
    }
};

export const trackAddToCart = (productId: string, productName: string, price: number, quantity: number) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'add_to_cart', {
            items: [{
                item_id: productId,
                item_name: productName,
                price: price,
                quantity: quantity
            }],
            currency: 'INR',
            value: price * quantity
        });
    }
};

export const trackRemoveFromCart = (productId: string, productName: string, price: number) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'remove_from_cart', {
            items: [{
                item_id: productId,
                item_name: productName,
                price: price
            }],
            currency: 'INR'
        });
    }
};

// Checkout Events
export const trackBeginCheckout = (items: any[], totalValue: number) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'begin_checkout', {
            items: items,
            currency: 'INR',
            value: totalValue
        });
    }
};

export const trackPurchase = (orderId: string, items: any[], totalValue: number, tax: number, shipping: number) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'purchase', {
            transaction_id: orderId,
            items: items,
            currency: 'INR',
            value: totalValue,
            tax: tax,
            shipping: shipping
        });
    }
};

// Search Events
export const trackSearch = (searchTerm: string) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'search', {
            search_term: searchTerm
        });
    }
};

// Page View
export const trackPageView = (pagePath: string, pageTitle: string) => {
    if (analytics) {
        logEvent(analytics as Analytics, 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
};

// Custom Events
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
    if (analytics) {
        logEvent(analytics as Analytics, eventName, params);
    }
};

// Set user properties
export const setAnalyticsUserProperties = (properties: Record<string, any>) => {
    if (analytics) {
        setUserProperties(analytics as Analytics, properties);
    }
};
