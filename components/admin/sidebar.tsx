'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    LayoutDashboard,
    User,
    Briefcase,
    Code2,
    GraduationCap,
    Award,
    LogOut,
    Settings
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin',
        color: 'text-sky-500',
    },
    {
        label: 'Profile',
        icon: User,
        href: '/admin/profile',
        color: 'text-violet-500',
    },
    {
        label: 'Projects',
        icon: Briefcase,
        href: '/admin/projects',
        color: 'text-pink-700',
    },
    {
        label: 'Skills',
        icon: Code2,
        href: '/admin/skills',
        color: 'text-orange-700',
    },
    {
        label: 'Education',
        icon: GraduationCap,
        href: '/admin/education',
        color: 'text-emerald-500',
    },
    {
        label: 'Certificates',
        icon: Award,
        href: '/admin/certificates',
        color: 'text-green-700',
    },
]

export const AdminSidebar = () => {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col bg-background border border-r h-full text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/admin" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/10 font-bold text-white">
                            E
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">
                        Elvien
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400',
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
