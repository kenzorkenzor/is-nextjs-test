import React from 'react'

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <h1>Admin</h1>
            <main>{children}</main>
        </>
    )
}
