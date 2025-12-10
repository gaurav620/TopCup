import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'TopCup Delivery Partner Dashboard',
    description: 'Manage your deliveries and track performance with TopCup',
    manifest: '/manifest.json',
    themeColor: '#14b8a6',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'TopCup Delivery',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#14b8a6" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                window.addEventListener('load', function() {
                                    navigator.serviceWorker.register('/sw.js');
                                });
                            }
                        `,
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
