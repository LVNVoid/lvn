"use client";

import { Sidebar, navItems } from "@/components/layout/sidebar";
import { MessageCircle, Copyright } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children, profile }: { children: React.ReactNode; profile: any }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileOpen]);

    return (
        <>
            <div className="flex flex-col lg:flex-row min-h-screen w-full mx-auto max-w-7xl bg-background/40 backdrop-blur-sm border-x border-border/50">
                <Sidebar className="shrink-0" profile={profile} />
                <Navbar isOpen={isMobileOpen} onToggle={() => setIsMobileOpen(!isMobileOpen)} profile={profile} />
                <main className="flex-1 min-h-screen min-w-0">
                    <div className="w-full py-8 lg:py-12 px-4 lg:px-6">
                        {children}
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed top-16 left-0 right-0 bottom-0 z-50 bg-background/80 backdrop-blur-md overflow-y-auto border-t border-border/40 flex flex-col p-6"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item, idx) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={cn(
                                                "flex items-center gap-2 p-2 rounded-xl text-base font-medium transition-all",
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <Icon className="h-6 w-6" />
                                            {item.name}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="mobile-active"
                                                    className="ml-auto w-2 h-2 rounded-full bg-primary"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-8 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Button className="w-full gap-2" size="lg">
                                    <MessageCircle className="h-5 w-5" />
                                    Smart Talk
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1"
                            >
                                Copyright <Copyright className="h-3 w-3" /> 2025 Elvien
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
