

import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import ProjectDetailClient from "./client"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params
    const project = await prisma.project.findUnique({
        where: { slug },
        select: { title: true, description: true }
    })

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Projects`,
        description: project.description,
    }
}

export default async function DetailProject(props: PageProps) {
    const { slug } = await props.params
    const project = await prisma.project.findUnique({
        where: {
            slug: slug,
        }
    })

    if (!project) {
        notFound()
    }

    return <ProjectDetailClient project={project} />
}