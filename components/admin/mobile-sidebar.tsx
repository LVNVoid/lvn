'use client'

import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

export const MobileSidebar = () => {
    const isMounted = useMounted()

    if (!isMounted) {
        return null
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-sidebar border-r border-border/80">
                <AdminSidebar />
            </SheetContent>
        </Sheet>
    )
}
