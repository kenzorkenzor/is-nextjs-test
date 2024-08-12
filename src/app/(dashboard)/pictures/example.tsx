'use client'

import React from 'react'
import { useExampleStore } from '@/providers/example-store-provider'

export default function Example() {
    const { upperName, upperEmail, loadingState } = useExampleStore((state) => state)

    return (
        <div>
            Uppercase Name: { upperName }.
            Uppercase Email: { upperEmail }.
            Loading State: { loadingState }.
        </div>
    )
}
