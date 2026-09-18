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
  iconClassName,
}: PageHeaderProps) {
  return (
    <SlideUp className={cn("space-y-2.5", className)}>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.035em] text-foreground flex items-center gap-3">
        {Icon && (
          <Icon
            className={cn("h-6 w-6 sm:h-7 sm:w-7 text-primary shrink-0", iconClassName)}
          />
        )}
        <span>{title}</span>
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </SlideUp>
  );
}
