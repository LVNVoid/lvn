

import { SlideUp } from "@/components/ui/animated";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    className?: string;
    iconClassName?: string;
}

export function PageHeader({
    title,
    description,
    icon: Icon,
    className,
    iconClassName
}: PageHeaderProps) {
    return (
        <>
            <SlideUp className={cn("space-y-4", className)}>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-3">
                    {Icon && <Icon className={cn("h-8 w-8 text-primary shrink-0", iconClassName)} />}
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground text-base lg:text-base max-w-2xl">
                        {description}
                    </p>
                )}
            </SlideUp>
        </>
    );
}
