"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, User, Award, FolderOpen, LayoutDashboard, Mail, Sparkles, MessageCircle, Copyright } from "lucide-react";
import { profile } from "@/data/mock";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Certificates", href: "/certificates", icon: Award },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Contact", href: "/contact", icon: Mail },
];

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
    const pathname = usePathname();

    const handleNavClick = () => {
        if (onNavigate) onNavigate();
    }

    return (
        <aside className={cn("sticky top-0 z-40 h-screen w-80 border-r border-border/40 p-6 hidden lg:flex flex-col gap-6", className)}>
            <div className="flex flex-col items-center pt-6 gap-3 text-center">
                <div className="h-24 w-24 rounded-full bg-muted overflow-hidden border-1 border-primary/20 relative">
                    <Image
                        src={profile.avatar || "/placeholder.png"}
                        alt={profile.name}
                        width={800}
                        height={800}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-bold flex items-center justify-center gap-1">
                        {profile.name} <span className="text-blue-500 text-sm">✓</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">@{profile.name.toLowerCase().replace(/\s/g, "")}</p>
                </div>

                <div className="flex gap-2">
                    <div className="flex gap-2 items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-border/50" />

            <nav className="flex-1 overflow-y-auto py-2 flex flex-col gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.name}
                            {isActive && <span className="ml-auto w-1 h-1 rounded-full bg-primary" />}
                        </Link>
                    )
                })}
            </nav>

            <div className="flex flex-col gap-4 mt-auto">
                <Button variant="outline" className="w-full justify-start gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all group">
                    <MessageCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Smart Talk
                </Button>

                <div className="text-center">
                    <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                        Copyright <Copyright className="h-2 w-2" /> 2025
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                        {profile.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </aside>
    );
}
