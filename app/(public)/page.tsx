import prisma from '@/lib/prisma'
import HomeClient from "@/components/features/home/home-client";

export const dynamic = 'force-dynamic'

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

    return <HomeClient profile={profile} projects={projects} />
}
