import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/providers/AuthProvider';
import { LanguageProvider } from '@/context/LanguageContext';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'TopCup - Premium Cakes, Gifts & Snacks | Order Online',
    description: 'Order delicious cakes, thoughtful gifts, and tasty snacks online. Free delivery across India. Same-day delivery available. Best prices guaranteed!',
    keywords: ['cakes', 'gifts', 'snacks', 'online cake delivery', 'birthday cake', 'gift delivery India'],
    authors: [{ name: 'TopCup' }],
    creator: 'TopCup',
    publisher: 'TopCup',
    applicationName: 'TopCup',
    manifest: '/manifest.json',
    appleWebApp: {
        statusBarStyle: 'default',
        title: 'TopCup',
    },
    other: {
        'mobile-web-app-capable': 'yes',
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        title: 'TopCup - Premium Cakes, Gifts & Snacks',
        description: 'Order delicious cakes, thoughtful gifts, and tasty snacks online.',
        url: 'https://topcup.in',
        siteName: 'TopCup',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TopCup - Premium Cakes, Gifts & Snacks',
        description: 'Order delicious cakes, thoughtful gifts, and tasty snacks online.',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/icons/icon-192x192.png',
        apple: '/icons/icon-192x192.png',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#f97316',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#f97316" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                window.addEventListener('load', function() {
                                    navigator.serviceWorker.register('/sw.js').then(
                                        function(registration) { console.log('SW registered'); },
                                        function(err) { console.log('SW registration failed'); }
                                    );
                                });
                            }
                        `,
                    }}
                />
            </head>
            <body className="min-h-screen flex flex-col">
                <LanguageProvider>
                    <AuthProvider>
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#fff',
                                    color: '#1a1a1a',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                                },
                                success: {
                                    iconTheme: {
                                        primary: '#22c55e',
                                        secondary: '#fff',
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: '#ef4444',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
