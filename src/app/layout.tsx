import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React, { Suspense } from 'react'
import { FullPageSpinner } from '@/components/full-page-spinner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'App',
    description: '',
}

export default async function RootLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Suspense fallback={<FullPageSpinner />}>
                {children}
            </Suspense>
        </body>
        </html>
    )
}
