import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { MobileSidebar } from "@/components/admin/mobile-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="h-full relative bg-background">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] border-r border-border/80 bg-sidebar">
        <AdminSidebar />
      </div>
      <main className="md:pl-72 h-full min-h-screen transition-all duration-300 ease-in-out">
        <div className="flex items-center p-4 md:hidden border-b border-border/80 bg-background/90 backdrop-blur-md sticky top-0 z-40">
          <MobileSidebar />
          <span className="ml-3 text-base font-bold tracking-tight text-foreground">
            Admin Console
          </span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 h-full">{children}</div>
      </main>
    </div>
  );
}
