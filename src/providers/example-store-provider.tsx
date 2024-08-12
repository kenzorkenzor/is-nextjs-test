'use client'

import {
    type ReactNode,
    createContext,
    useRef,
    useContext,
} from 'react'
import { useStore } from 'zustand'

import {
    type ExampleStore,
    createExampleStore
} from '@/stores/example-store'

/**
 * API definition of the ExampleStore.
 */
export type ExampleStoreApi = ReturnType<typeof createExampleStore>

/**
 * React context for the ExampleStore.
 */
export const ExampleStoreContext = createContext<ExampleStoreApi | undefined>(undefined)

/**
 * Context provider component for the ExampleStore.
 */
export const ExampleStoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<ExampleStoreApi>()

    if (!storeRef.current) {
        storeRef.current = createExampleStore()
    }

    return (
        <ExampleStoreContext.Provider value={ storeRef.current }>
            { children }
        </ExampleStoreContext.Provider>
    )
}

/**
 * Hook to access the ExampleStore.
 */
export const useExampleStore = <T, >(selector: (store: ExampleStore) => T): T => {
    const exampleStoreContext = useContext(ExampleStoreContext)

    if (!exampleStoreContext) {
        throw new Error(`useExampleStore must be used within ExampleStoreProvider`)
    }

    return useStore(exampleStoreContext, selector)
}
