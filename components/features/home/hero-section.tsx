'use client';

import { SlideUp } from '@/components/ui/animated';
import { buttonVariants } from '@/components/ui/button';
import { Download, ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Profile } from '@/schemas/profile-schema';

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="space-y-8 py-2">
      <SlideUp>
        <div className="space-y-4">
          {/* Status Indicator Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1 text-xs font-mono text-teal-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            Available for new opportunities
          </div>

          {/* Editorial Display Typography */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
              {profile.name}
            </h1>
            <p className="text-lg font-medium tracking-tight text-teal-500/90 sm:text-xl">
              Software Engineer &amp; System Builder
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-mono">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
              {profile.location || 'Indonesia'}
            </span>
            <span className="text-border">•</span>
            <span className="font-mono">Full-Stack &amp; Systems</span>
          </div>
        </div>
      </SlideUp>

      {/* Bio Narrative */}
      <SlideUp delay={0.1}>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {profile.bio ||
            'Specializing in architecting robust web applications, reliable APIs, and polished developer tooling.'}
        </p>
      </SlideUp>

      {/* Action Buttons */}
      <SlideUp delay={0.2}>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href="/projects"
            className={buttonVariants({
              className: 'gap-2 px-5 py-2.5 font-medium shadow-sm transition-transform active:scale-[0.98]',
            })}
          >
            View Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <a
            href="/cv.pdf"
            download="CV_Elvien.pdf"
            className={buttonVariants({
              variant: 'outline',
              className: 'gap-2 px-4 py-2.5 font-medium text-foreground transition-transform active:scale-[0.98]',
            })}
          >
            <Download className="h-4 w-4 text-muted-foreground" />
            Resume
          </a>
        </div>
      </SlideUp>
    </section>
  );
}
