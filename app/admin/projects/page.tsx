import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Eye } from 'lucide-react'
import { DeleteButton } from "@/components/admin/delete-button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    searchParams: Promise<{
        page?: string
        limit?: string
    }>
}

async function getProjects(page: number, limit: number) {
    const skip = (page - 1) * limit
    const [projects, total] = await Promise.all([
        prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.project.count(),
    ])
    return { projects, total }
}

export default async function ProjectsPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = parseInt(params.page || '1')
    const limit = parseInt(params.limit || '10')
    const { projects, total } = await getProjects(page, limit)
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">
                        Showcase your work and case studies.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Tech Stack</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech.map((t) => (
                                                <Badge key={t} variant="secondary" className="text-xs">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/projects/${project.id}`}>
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/projects/${project.id}/edit`}>
                                                    <Pencil className="h-4 w-4 text-muted-foreground" />
                                                </Link>
                                            </Button>
                                            <DeleteButton id={project.id} section="projects" itemName="Project" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Pagination className="justify-end w-auto mx-0">
                    <PaginationContent>
                        <PaginationItem>
                            {page > 1 ? (
                                <PaginationPrevious href={`/admin/projects?page=${page - 1}`} />
                            ) : (
                                <PaginationPrevious
                                    href="#"
                                    className="pointer-events-none opacity-50"
                                    aria-disabled={true}
                                    tabIndex={-1}
                                />
                            )}
                        </PaginationItem>

                        <PaginationItem>
                            <span className="text-sm font-medium px-4">
                                Page {page} of {totalPages}
                            </span>
                        </PaginationItem>

                        <PaginationItem>
                            {page < totalPages ? (
                                <PaginationNext href={`/admin/projects?page=${page + 1}`} />
                            ) : (
                                <PaginationNext
                                    href="#"
                                    className="pointer-events-none opacity-50"
                                    aria-disabled={true}
                                    tabIndex={-1}
                                />
                            )}
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
