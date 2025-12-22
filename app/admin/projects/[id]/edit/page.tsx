import ProjectForm from '@/components/admin/ProjectForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

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
            </div>
            <ProjectForm initialData={project} />
        </div>
    )
}
