'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'
import { AppSession } from '@/lib/types'
import { logout } from '@/lib/utils'

interface AccountMenuInterface {
    session: AppSession | null
}

export default function AccountMenu(props: AccountMenuInterface) {
    /**
     * Logout the user.
     */
    const logoutUser = async () => {
        await logout()
    }

    /**
     * Open support page in new tab.
     */
    const onSupportClick = () => {
        window.open('https://example.com/support', '_blank')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5"/>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel
                    className="font-light text-xs text-gray-500 pt-0">
                    { props.session?.userDetails.firstName }
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={ onSupportClick }>Support</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={ logoutUser }>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
