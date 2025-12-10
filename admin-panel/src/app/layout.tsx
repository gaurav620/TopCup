'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>TopCup Admin Panel</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#6366f1" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
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
            <body className={inter.className}>
                <SessionProvider>
                    {children}
                    <Toaster position="top-right" />
                </SessionProvider>
            </body>
        </html>
    )
}
