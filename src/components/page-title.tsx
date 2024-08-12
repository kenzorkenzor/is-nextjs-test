import React from 'react'

export default function PageTitle({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <h1 className="text-lg font-semibold md:text-2xl">{ children }</h1>
    )
}
