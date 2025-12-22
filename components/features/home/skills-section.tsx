'use client';

import { SlideUp } from '@/components/ui/animated';
import LogoLoop from '@/components/ui/logo-loop';
import { PageHeader } from '@/components/ui/page-header';
import { Code2 } from 'lucide-react';
import { techLogos } from './home-data';

export function SkillsSection() {
    return (
        <section className="space-y-6">
            <SlideUp delay={0.2}>
                <PageHeader title="Tech Stack" icon={Code2} />
            </SlideUp>
            <SlideUp delay={0.3}>
                <div className="space-y-6">
                    <LogoLoop
                        logos={techLogos}
                        speed={40}
                        direction="left"
                        logoHeight={30}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="bg-primary"
                        ariaLabel="Tech Stack"
                    />
                    <LogoLoop
                        logos={techLogos}
                        speed={40}
                        direction="right"
                        logoHeight={30}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="bg-primary"
                        ariaLabel="Tech Stack"
                    />
                </div>
            </SlideUp>
        </section>
    );
}
