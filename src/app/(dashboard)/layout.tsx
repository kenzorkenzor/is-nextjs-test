import Link from 'next/link'
import {
    Bell,
    Menu,
    Package2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import AccountMenu from './_PageSections/account-menu'
import DashboardNav from './_PageSections/nav'
import React from 'react'
import { appSession } from '@/lib/utils'
import { SessionProvider } from 'next-auth/react'
import SessionLoader from '@/components/session-loader'
import { CounterStoreProvider } from '@/providers/counter-store-provider'
import { ExampleStoreProvider } from '@/providers/example-store-provider'

export default async function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    const session = await appSession()

    return (
        <ExampleStoreProvider>
            <CounterStoreProvider>
                <SessionProvider session={ session } refetchInterval={ 900 }>
                    <SessionLoader>
                        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                            <div className="hidden border-r bg-muted/40 md:block">
                                <div className="flex h-full max-h-screen flex-col gap-2">
                                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                                        <Link href="/" className="flex items-center gap-2 font-semibold">
                                            <Package2 className="h-6 w-6"/>
                                            <span className="">App</span>
                                        </Link>
                                    </div>
                                    <div className="flex-1">
                                        <DashboardNav session={session}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="shrink-0 md:hidden"
                                            >
                                                <Menu className="h-5 w-5"/>
                                                <span className="sr-only">Toggle navigation menu</span>
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left" className="flex flex-col">
                                            <DashboardNav session={session}/>
                                        </SheetContent>
                                    </Sheet>
                                    <div className="w-full flex-1">
                                    </div>
                                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                        <Bell className="h-4 w-4"/>
                                        <span className="sr-only">Toggle notifications</span>
                                    </Button>
                                    <AccountMenu session={session}/>
                                </header>
                                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </SessionLoader>
                </SessionProvider>
            </CounterStoreProvider>
        </ExampleStoreProvider>
    )
}
