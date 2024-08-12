'use client'

import {
    type ReactNode,
    createContext,
    useRef,
    useContext,
} from 'react'
import { useStore } from 'zustand'

import {
    type CounterStore,
    createCounterStore,
    initCounterStore,
} from '@/stores/counter-store'

/**
 * API definition of the CounterStore.
 */
export type CounterStoreApi = ReturnType<typeof createCounterStore>

/**
 * React context for the CounterStore.
 */
export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined)

/**
 * Context provider component for the CounterStore.
 */
export const CounterStoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<CounterStoreApi>()

    if (!storeRef.current) {
        storeRef.current = createCounterStore(initCounterStore())
    }

    return (
        <CounterStoreContext.Provider value={ storeRef.current }>
            { children }
        </CounterStoreContext.Provider>
    )
}

/**
 * Hook to access the CounterStore.
 */
export const useCounterStore = <T, >(selector: (store: CounterStore) => T): T => {
    const counterStoreContext = useContext(CounterStoreContext)

    if (!counterStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }

    return useStore(counterStoreContext, selector)
}
