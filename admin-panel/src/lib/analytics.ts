// Firebase Analytics Service - Admin Panel Stub
// Track user events and conversions (not used in Admin Panel)

// Page View
export const trackPageView = (pagePath: string, pageTitle: string) => {
    // Admin panel doesn't need analytics tracking
};

// User Events
export const trackUserLogin = (userId: string, method: string) => { };
export const trackUserSignup = (userId: string, method: string) => { };

// Product Events
export const trackViewItem = (productId: string, productName: string, price: number, category: string) => { };
export const trackAddToCart = (productId: string, productName: string, price: number, quantity: number) => { };
export const trackRemoveFromCart = (productId: string, productName: string, price: number) => { };

// Checkout Events
export const trackBeginCheckout = (items: any[], totalValue: number) => { };
export const trackPurchase = (orderId: string, items: any[], totalValue: number, tax: number, shipping: number) => { };

// Search Events
export const trackSearch = (searchTerm: string) => { };

// Custom Events
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => { };

// Set user properties
export const setAnalyticsUserProperties = (properties: Record<string, any>) => { };
