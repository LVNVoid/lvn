import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/sidebar'
import { MobileSidebar } from '@/components/admin/mobile-sidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <AdminSidebar />
            </div>
            <main className="md:pl-72 h-full min-h-screen transition-all duration-300 ease-in-out">
                <div className="flex items-center p-4 md:hidden border-b bg-white dark:bg-gray-800 shadow-sm">
                    <MobileSidebar />
                    <span className="ml-4 text-lg font-bold">Admin Panel</span>
                </div>
                <div className="p-8 h-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
