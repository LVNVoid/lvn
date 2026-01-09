import prisma from '@/lib/prisma'
import { HeroSection } from '@/components/features/home/hero-section';
import { SkillsSection } from '@/components/features/home/skills-section';
import { FeaturedProjectsSection } from '@/components/features/home/featured-projects-section';
import { CtaSection } from '@/components/features/home/cta-section';

export const revalidate = 60;

async function getData() {
    try {
        const profile = await prisma.profile.findFirst()
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3,
        })
        const skills = await prisma.skill.findMany({
            select: { name: true }
        })
        return { profile, projects, skills }
    } catch (e) {
        console.error(e)
        return { profile: null, projects: [], skills: [] }
    }
}

export default async function HomePage() {
    const { profile, projects, skills } = await getData()

    if (!profile) return null;

    const socials = profile.socials as { github?: string; linkedin?: string; twitter?: string } | null;
    const sameAs = [
        socials?.github,
        socials?.linkedin,
        socials?.twitter
    ].filter(Boolean) as string[];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        description: profile.bio,
        url: 'https://elviencode.vercel.app',
        image: profile.avatar,
        sameAs: sameAs,
        knowsAbout: skills.map(skill => skill.name),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="flex flex-col gap-10 pb-24 w-full">
                <HeroSection profile={profile} />

                <div className="w-full h-[1px] bg-border/50" />

                <FeaturedProjectsSection projects={projects} />

                <div className="w-full h-[1px] bg-border/50" />

                <SkillsSection />

                <CtaSection />
            </div>
        </>
    )
}
