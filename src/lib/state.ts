/**
 * List of callback functions where each function resets a single store.
 */
const storeResetFns = new Set<() => void>()

/**
 * Reset all stores using the list of reset callback functions.
 */
export const resetAllStores = () => {
    storeResetFns.forEach((resetFn) => {
        resetFn()
    })
}

/**
 * Add a store reset callback function to the list.
 *
 * @param resetFn
 */
export const addStoreToResetList = (resetFn: () => void) => {
    storeResetFns.add(resetFn)
}

