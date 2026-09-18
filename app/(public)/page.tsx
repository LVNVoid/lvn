import { HeroSection } from '@/components/features/home/hero-section';
import { SkillsSection } from '@/components/features/home/skills-section';
import { FeaturedProjectsSection } from '@/components/features/home/featured-projects-section';
import { CtaSection } from '@/components/features/home/cta-section';
import { getProfile } from '@/services/profile-service';
import { getFeaturedProjects } from '@/services/project-service';
import { getSkills } from '@/services/skill-service';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Elviencode – Software Engineer Portfolio',
  description:
    'Personal portfolio of Elviencode, Software Engineer and Full Stack Developer building modern, resilient, high-performance web applications with Next.js and TypeScript.',
  alternates: {
    canonical: 'https://elvien.net',
  },
  openGraph: {
    title: 'Elviencode – Software Engineer Portfolio',
    description:
      'Personal portfolio of Elviencode, Software Engineer and Full Stack Developer specializing in Next.js and modern web systems.',
    url: 'https://elvien.net',
    siteName: 'Elvien Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elviencode Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elviencode – Software Engineer Portfolio',
    description:
      'Personal portfolio of Elviencode, Software Engineer and Full Stack Developer specializing in Next.js and TypeScript.',
    images: ['/og-image.jpg'],
    creator: '@elviencode',
  },
};

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getFeaturedProjects(3),
    getSkills(),
  ]);

  if (!profile) return null;

  const socials = profile.socials;
  const sameAs = [socials?.github, socials?.linkedin, socials?.twitter].filter(
    Boolean,
  ) as string[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: profile.bio,
    url: 'https://elvien.net',
    image: profile.avatar,
    sameAs: sameAs,
    knowsAbout: skills.map((skill) => skill.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-10 pb-24 ">
        <h1 className="sr-only">Elviencode – Software Engineer Portfolio</h1>
        <HeroSection profile={profile} />

        <div className="w-full h-[1px] bg-border/50" />

        <FeaturedProjectsSection projects={projects} />

        <div className="w-full h-[1px] bg-border/50" />

        <SkillsSection />

        <CtaSection />
      </div>
    </>
  );
}
