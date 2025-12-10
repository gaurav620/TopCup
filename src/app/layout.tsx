import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/providers/AuthProvider';

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
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
            <body className="min-h-screen flex flex-col">
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
            </body>
        </html>
    );
}
