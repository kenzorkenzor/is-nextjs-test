'use client'

import React, {
    useEffect,
} from 'react'
import {
    useSession,
} from 'next-auth/react'
import { FullPageSpinner } from '@/components/full-page-spinner'
import { useExampleStore } from '@/providers/example-store-provider'

export default function SessionLoader({ children }: Readonly<{
    children: React.ReactNode
}>) {
    const session = useSession()
    const { loadingState, setLoadingState, setData } = useExampleStore((state) => state)

    useEffect(() => {
        const init = async () => {
            if (session) {
                if (session.status === 'authenticated') {
                    const result = await fetch('/api/echo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: session.data.user?.name,
                            email: session.data.user?.email,
                        }),
                    })

                    const data = await result.json()

                    setData({ upperName: data.name, upperEmail: data.email })
                    setLoadingState('loaded')
                } else if (session.status === 'unauthenticated') {
                    setLoadingState('pending')
                }
            }
        }

        init()
    }, [session])

    return (
        <>
            { loadingState === 'pending' && <FullPageSpinner/> }
            { loadingState === 'failed' && <p>Failed to load session</p> }
            { loadingState === 'loaded' && children }
        </>
    )
}
