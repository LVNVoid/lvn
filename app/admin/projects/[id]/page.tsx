import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChevronLeft, Edit, Github, Globe } from 'lucide-react'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage(props: PageProps) {
    const params = await props.params;
    const project = await prisma.project.findUnique({
        where: { id: params.id },
    })

    if (!project) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/projects">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Project Details</h2>
                </div>
                <Button asChild>
                    <Link href={`/admin/projects/${project.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Project
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">{project.title}</CardTitle>
                            <CardDescription>
                                Created on {new Date(project.createdAt).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                    {project.description}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                {project.link && (
                                    <Button variant="outline" asChild>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            <Globe className="mr-2 h-4 w-4" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {project.github && (
                                    <Button variant="outline" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg overflow-hidden border bg-muted/50 aspect-video relative flex items-center justify-center">
                                {project.image ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-muted-foreground text-sm">No image provided</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
