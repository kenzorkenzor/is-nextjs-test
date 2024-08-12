'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Images,
    Settings,
} from 'lucide-react'
import {
    AppSession,
} from '@/lib/types'

interface DashboardNavInterface {
    session: AppSession | null
}

export default function DashboardNav(props: DashboardNavInterface) {
    const pathname = usePathname()

    return (
        <nav className="grid items-start px-2 space-y-4 text-sm font-medium lg:px-4 lg:space-y-8">
            <div>
                <h3 className="mb-1 pb-1 border-b-2 border-gray-100 text-foreground/90">Menu</h3>
                <Link
                    href="/pictures"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/pictures' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                >
                    <Images className="h-4 w-4"/>
                    Page A
                </Link>
                <Link
                    href="/settings"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/settings' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                >
                    <Settings className="h-4 w-4"/>
                    Page B
                </Link>
            </div>
        </nav>
    )
}
