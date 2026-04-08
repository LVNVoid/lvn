'use client';

import { SlideUp } from '@/components/ui/animated';
import LogoLoop from '@/components/ui/logo-loop';
import { PageHeader } from '@/components/ui/page-header';
import { Code2 } from 'lucide-react';
import { techLogos } from './home-data';
import { useState, useEffect } from 'react';

export function SkillsSection() {
  const [gap, setGap] = useState(60);
  const [logoHeight, setLogoHeight] = useState(30);

  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth < 640) {
        // sm
        setGap(30);
        setLogoHeight(24);
      } else if (window.innerWidth < 1024) {
        // md-lg
        setGap(40);
        setLogoHeight(28);
      } else {
        setGap(60);
        setLogoHeight(30);
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

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
            logoHeight={logoHeight}
            gap={gap}
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
            logoHeight={logoHeight}
            gap={gap}
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
