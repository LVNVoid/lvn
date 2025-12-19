"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FeaturedCardProps {
    title: string;
    description: string;
    href: string;
    icon?: LucideIcon;
    image?: string;
    className?: string;
}

export function FeaturedCard({ title, description, href, icon: Icon, className }: FeaturedCardProps) {
    return (
        <Link href={href} className={cn("group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card/50 p-6 transition-all hover:bg-card hover:shadow-md", className)}>
            <div className="space-y-2">
                {Icon && (
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                    </div>
                )}
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 bg-transparent transition-all group-hover:opacity-100 group-hover:translate-x-1">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
            </div>
        </Link>
    )
}
