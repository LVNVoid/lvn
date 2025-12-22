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
        return { profile, projects }
    } catch (e) {
        console.error(e)
        return { profile: null, projects: [] }
    }
}

export default async function HomePage() {
    const { profile, projects } = await getData()

    if (!profile) return null;

    return (
        <div className="flex flex-col gap-10 pb-24 w-full">
            <HeroSection profile={profile} />

            <div className="w-full h-[1px] bg-border/50" />

            <FeaturedProjectsSection projects={projects} />

            <div className="w-full h-[1px] bg-border/50" />

            <SkillsSection />

            <CtaSection />
        </div>
    )
}
