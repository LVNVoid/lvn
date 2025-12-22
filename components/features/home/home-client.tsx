'use client';

import { HeroSection } from './hero-section';
import { SkillsSection } from './skills-section';
import { FeaturedProjectsSection } from './featured-projects-section';
import { CtaSection } from './cta-section';

interface HomeClientProps {
  profile: any;
  projects: any[];
}

export default function HomeClient({ profile, projects }: HomeClientProps) {
  if (!profile) return null;

  return (
    <div className="flex flex-col gap-10 pb-24 w-full">
      <HeroSection profile={profile} />

      <div className="w-full h-[1px] bg-border/50" />

      <SkillsSection />

      <div className="w-full h-[1px] bg-border/50" />

      <FeaturedProjectsSection projects={projects} />

      <CtaSection />
    </div>
  );
}
