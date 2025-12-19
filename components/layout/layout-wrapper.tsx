"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/theme-toggle"; // Reusing for mobile potentially
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Need to create Sheet if I want a mobile drawer, but for now I'll just hide sidebar on mobile and show top nav? 
// Actually, let's just make a simple mobile wrapper.

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full mx-auto max-w-7xl bg-background/40 backdrop-blur-sm border-x border-border/50">
            {/* Desktop Sidebar */}
            <Sidebar className="shrink-0" />

            {/* Mobile Header (Hidden on LG) */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-xl z-50 flex items-center px-4 justify-between">
                <span className="font-bold">Elvien</span>
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-80">
                        <Sidebar
                            className="relative w-full h-full border-none bg-transparent flex"
                            onNavigate={() => setIsMobileOpen(false)}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 min-h-screen">
                <div className="w-full py-8 pt-20 lg:py-12 px-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
