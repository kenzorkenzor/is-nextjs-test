import { createStore } from 'zustand/vanilla'
import {
    addStoreToResetList,
} from '@/lib/state'

/**
 * Loading state of example store.
 */
type LoadingState = 'pending' | 'loaded' | 'failed'

/**
 * Example store state.
 */
export type ExampleState = {
    upperName: string
    upperEmail: string
    loadingState: LoadingState
}

type PartialData = Omit<Partial<ExampleState>, 'loadingState'>

/**
 * Actions that can be performed on example store.
 */
export type ExampleActions = {
    setData: (data: PartialData) => void
    setLoadingState: (loadingState: LoadingState) => void
}

/**
 * Example store.
 */
export type ExampleStore = ExampleState & ExampleActions

/**
 * Default initial state of example store.
 */
export const defaultInitState: ExampleState = {
    upperName: '',
    upperEmail: '',
    loadingState: 'pending',
}

/**
 * Create example store with default values, populate when init function has finished, and add callback to reset list.
 */
export const createExampleStore = () => {
    return createStore<ExampleStore>()(function (set) {
        addStoreToResetList(() => {
            set(defaultInitState)
        })

        return {
            ...defaultInitState,
            setData: (data: PartialData) => set((state) => ({ ...state, ...data })),
            setLoadingState: (loadingState: LoadingState) => set(() => ({ loadingState })),
        }
    })
}
