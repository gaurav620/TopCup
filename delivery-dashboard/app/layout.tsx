import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'TopCup Delivery Partner Dashboard',
    description: 'Manage your deliveries and track performance with TopCup',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
