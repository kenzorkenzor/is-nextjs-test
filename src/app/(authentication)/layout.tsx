import React from 'react'

export default function AuthenticationLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <main className="relative flex min-h-screen flex-col bg-background/40">
                {children}
            </main>
        </>
    )
}
