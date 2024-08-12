'use client'

import React from 'react'
import { useCounterStore } from '@/providers/counter-store-provider'

export default function Counter() {
    const { count, loadingState, incrementCount, decrementCount, setCount } = useCounterStore(
        (state) => state,
    )

    return (
        <div>
            Current Count: { count }.
            Loading State: { loadingState }.
            <hr/>
            <hr/>
            { loadingState === 'loaded' && (
                <>
                    <button type="button" onClick={ () => void incrementCount() }>
                        Increment Count
                    </button>
                    &nbsp;|&nbsp;
                    <button type="button" onClick={ () => void decrementCount() }>
                        Decrement Count
                    </button>
                    &nbsp;|&nbsp;
                    <button type="button" onClick={ () => void setCount(79) }>
                        Set Count to 79
                    </button>
                </>
            ) }
        </div>
    )
}
