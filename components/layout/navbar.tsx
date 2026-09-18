"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/schemas/profile-schema";

interface NavbarProps {
  isOpen: boolean;
  onToggle: () => void;
  profile: Profile | null;
}

export function Navbar({ isOpen, onToggle, profile }: NavbarProps) {
  const name = profile?.name || "Elvien";
  const avatar = profile?.avatar || "/placeholder.png";

  return (
    <header className="lg:hidden sticky top-0 left-0 right-0 h-16 border-b border-border/80 bg-background/90 backdrop-blur-md z-50 flex items-center px-4 justify-between">
      <Link href="/" className="flex items-center space-x-2.5 min-w-0">
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/80 shrink-0">
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="40px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="text-base sm:text-lg font-bold flex items-center gap-1.5 truncate tracking-tight">
          <span className="truncate">{name}</span>
          <Image
            src="/icons/verified-logo.svg"
            alt="Verified"
            width={18}
            height={18}
            className="shrink-0"
          />
        </h2>
      </Link>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="relative h-10 w-10 overflow-hidden hover:bg-muted"
          aria-label="Toggle Menu"
        >
          <motion.div
            className="absolute h-0.5 w-5 bg-foreground rounded-full"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -6,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute h-0.5 w-5 bg-foreground rounded-full"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute h-0.5 w-5 bg-foreground rounded-full"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 6,
            }}
            transition={{ duration: 0.2 }}
          />
        </Button>
      </div>
    </header>
  );
}
