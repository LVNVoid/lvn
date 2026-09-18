'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  LogOut,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/admin/profile',
  },
  {
    label: 'Projects',
    icon: Briefcase,
    href: '/admin/projects',
  },
  {
    label: 'Skills',
    icon: Code2,
    href: '/admin/skills',
  },
  {
    label: 'Education',
    icon: GraduationCap,
    href: '/admin/education',
  },
  {
    label: 'Certificates',
    icon: Award,
    href: '/admin/certificates',
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col bg-card border-r border-border/80 h-full text-foreground">
      <div className="px-4 py-2 flex-1">
        <Link
          href="/admin"
          className="flex items-center gap-2 mb-4 p-2 rounded-xl border border-border/60 bg-secondary/30 hover:border-teal-500/30 transition-colors"
        >
          <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          <h1 className="text-base font-mono font-bold tracking-tight text-foreground">
            elviencode <span className="text-[10px] text-teal-400 font-normal">/ console</span>
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-xs sm:text-sm group flex p-2.5 w-full justify-start font-medium cursor-pointer rounded-lg transition-colors',
                  isActive
                    ? 'text-teal-400 font-semibold bg-teal-500/10 border border-teal-500/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon
                    className={cn(
                      'h-4 w-4 mr-3 transition-colors',
                      isActive ? 'text-teal-400' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-2 space-y-2 border-t border-border/60 pt-4">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full justify-start text-xs font-mono text-muted-foreground hover:text-foreground hover:border-teal-500/30"
        >
          <Link href="/" target="_blank">
            <Globe className="h-3.5 w-3.5 mr-2 text-teal-400" />
            Live Website
            <ArrowUpRight className="h-3 w-3 ml-auto opacity-70" />
          </Link>
        </Button>

        <Button
          onClick={() => signOut()}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs font-mono text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          End Session
        </Button>
      </div>
    </div>
  );
};
