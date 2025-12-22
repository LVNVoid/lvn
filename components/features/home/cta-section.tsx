'use client';

import { SlideUp } from '@/components/ui/animated';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
    return (
        <section className="py-12 relative rounded-2xl overflow-hidden bg-primary/5 border border-primary/10">
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 p-6">
                <SlideUp delay={0.6}>
                    <h2 className="text-3xl font-bold">Ready to work together?</h2>
                    <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                        I&apos;m always open to discussing product design work or
                        partnership opportunities.
                    </p>
                </SlideUp>
                <SlideUp delay={0.7}>
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/contact">
                            Get in touch <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </SlideUp>
            </div>
        </section>
    );
}
