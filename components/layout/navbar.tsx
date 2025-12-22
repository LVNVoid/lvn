"use client";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/mock";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Navbar({ isOpen, onToggle }: NavbarProps) {
    return (
        <div className="lg:hidden sticky top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/80 backdrop-blur-md z-50 flex items-center px-4 justify-between">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-1 border-gray-500">
                    <Image
                        src={profile.avatar || "/placeholder.png"}
                        alt={profile.name}
                        width={200}
                        height={200}
                        className="object-cover"
                    />
                </div>

                <h2 className="text-lg font-bold flex items-center gap-1">
                    {profile.name}
                    <Image
                        src="/icons/verified-logo.svg"
                        alt="Verified"
                        width={20}
                        height={20}
                    />
                </h2>
            </Link>

            <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="relative h-10 w-10 overflow-hidden hover:bg-muted"
                aria-label="Toggle Menu"
            >
                <motion.div
                    className="absolute h-1 w-6 bg-foreground rounded-full"
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 0 : -8,
                    }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    className="absolute h-1 w-6 bg-foreground rounded-full"
                    animate={{
                        opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    className="absolute h-1 w-6 bg-foreground rounded-full"
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? 0 : 8,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </Button>
        </div>
    );
}
