'use client';

import { SlideUp } from '@/components/ui/animated';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-12 sm:py-16 relative rounded-2xl overflow-hidden bg-card/60 border border-border/80 transition-colors hover:border-teal-500/30">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent opacity-60 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 p-6 sm:p-10">
        <SlideUp delay={0.2} className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            Open for Engineering Engagements
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.035em] text-foreground">
            Ready to build high-impact software?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I am available for full-stack engineering contracts, web architecture consulting, and production systems development.
          </p>
        </SlideUp>
        <SlideUp delay={0.3}>
          <Button size="lg" className="gap-2 font-medium" asChild>
            <Link href="/contact">
              Initiate Contact <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </SlideUp>
      </div>
    </section>
  );
}
