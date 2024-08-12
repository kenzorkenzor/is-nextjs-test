import {
    type ClassValue,
    clsx,
} from 'clsx'
import { twMerge } from 'tailwind-merge'
import { resetAllStores } from '@/lib/state'
import { auth } from '@/auth'
import { AppSession } from '@/lib/types'
import {
    signOut as clientSignOut,
} from 'next-auth/react'
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Reset all stores and sign out.
 */
export async function logout() {
    // Delay resetting to avoid UI updating before the redirect occurs
    setTimeout(() => {
        resetAllStores()
    }, 1000)

    await clientSignOut({ callbackUrl: '/login' })
}

/**
 * Get the current session.
 */
export async function appSession() {
    return (await auth()) as AppSession
}

/**
 * Delay for a specified number of seconds.
 */
export async function delay(seconds: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}
