import { createStore } from 'zustand/vanilla'
import {
    addStoreToResetList,
} from '@/lib/state'
import { delay } from '@/lib/utils'

/**
 * Loading state of counter store.
 */
type LoadingState = 'pending' | 'loaded' | 'failed'

/**
 * Counter store state.
 */
export type CounterState = {
    count: number
    loadingState: LoadingState
}

/**
 * Actions that can be performed on counter store.
 */
export type CounterActions = {
    decrementCount: () => void
    incrementCount: () => void
    setCount: (count: number) => void
    setLoadingState: (loadingState: LoadingState) => void
}

/**
 * Counter store.
 */
export type CounterStore = CounterState & CounterActions

/**
 * Init counter store.
 *
 * Includes artificial delay to simulate async initialization.
 */
export const initCounterStore = async (): Promise<CounterState> => {
    await delay(2)

    return {
        count: Math.floor(Math.random() * 100000),
        loadingState: 'loaded',
    }
}

/**
 * Default initial state of counter store.
 */
export const defaultInitState: CounterState = {
    count: 0,
    loadingState: 'pending',
}

/**
 * Create counter store with default values, populate when init function has finished, and add callback to reset list.
 */
export const createCounterStore = (initState: Promise<CounterState>) => {
    const store = createStore<CounterStore>()(function (set) {
        addStoreToResetList(() => {
            set(defaultInitState)
        })

        return {
            ...defaultInitState,
            decrementCount: () => set((state) => ({ count: state.count - 1 })),
            incrementCount: () => set((state) => ({ count: state.count + 1 })),
            setCount: (count: number) => set(() => ({ count })),
            setLoadingState: (loadingState: LoadingState) => set(() => ({ loadingState })),
        }
    })

    initState.then(store.setState)

    return store
}
