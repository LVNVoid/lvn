import ProjectForm from '@/components/admin/ProjectForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

// Correct PageProps handling for App Router in Next.js 15+ (which user seems to be on 16)
interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage(props: PageProps) {
    const params = await props.params;
    const project = await prisma.project.findUnique({
        where: { id: params.id },
    })

    if (!project) {
        notFound()
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Project</h2>
                {/* Could add Delete Button here */}
            </div>
            <ProjectForm initialData={project} />
        </div>
    )
}
