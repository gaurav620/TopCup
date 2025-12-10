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
            <body className={inter.className}>
                <SessionProvider>
                    {children}
                    <Toaster position="top-right" />
                </SessionProvider>
            </body>
        </html>
    )
}
